import { useEffect, useState } from 'react'
import * as d3 from 'd3'
import type { ProducerValue, Producers, Producer } from './types'
import { 
  NUM_PRODUCERS,
  SOCKET_URL_PREFIX,
  REDUCED_BATCH_SIZE,
  MAX_PRODUCER_VALUES,
  BATCH_SIZE
} from '../../constants'

export type useConnectToProducersReturnType = {
  producers: Producers
  averages: number[] // New: Array to store running averages for each producer
  allSocketsConnected: boolean
}

const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L');
const convertTime = (t: string) => parseTime(t.slice(0, 23))

const useConnectToProducers = () : useConnectToProducersReturnType => {
  const [producers, setProducers] = useState<Producers>(Array(NUM_PRODUCERS).fill([]))
  const [averages, setAverages] = useState<number[]>(Array(NUM_PRODUCERS).fill(0))
  const [numConnections, setNumConnections] = useState(0);
  const [allSocketsConnected, setAllSocketsConnected] = useState(false);
 
  const addBatchToProducer = (producerIdx: number, messageEvent: MessageEvent<string>) => {
    setProducers((prevProducers) => {
      if (prevProducers.length > NUM_PRODUCERS) {
        console.error(`Producer index ${producerIdx} out of bounds`)
        return prevProducers
      }
  
      const updatedProducers = prevProducers.map(producer => [...producer])
      const producer = updatedProducers[producerIdx] as Producer
  
      const batch: ProducerValue[] = JSON.parse(messageEvent.data)
      const evenlyDistributedSampledBatch = downsampleBatch(batch)
  
      producer.push(...evenlyDistributedSampledBatch)

      // Remove oldest values - showing x seconds of data
      if (producer.length >= MAX_PRODUCER_VALUES) {
        producer.splice(0, REDUCED_BATCH_SIZE)
      }

      const average = calculateAverage(producer)
      setAverages((prevAverages) => {
        const newAverages = [...prevAverages]
        newAverages[producerIdx] = average
        return newAverages
      })

      return updatedProducers
    })
  }

  useEffect(() => {
    const controller = new AbortController();

    for (let i = 0; i < NUM_PRODUCERS; i++) {
      const url = `${SOCKET_URL_PREFIX}producer_${i}`
      const socket = new WebSocket(url)
      controller.signal.addEventListener('abort', () => socket.close())
      socket.onopen = () => {
        console.log(`Connected to producer ${i}`)
        setNumConnections(prev => prev + 1)
      }
      socket.onmessage = e => addBatchToProducer(i, e); 
      socket.onerror = e => console.error(`Error in producer ${i}:`, e)
    }

    return () => {
      controller.abort();
    }
  }, [])

  useEffect(() => {
    if (numConnections === NUM_PRODUCERS)
      setAllSocketsConnected(true)
  }, [numConnections])

  return { 
    producers,
    averages,
    allSocketsConnected
  }
}

export default useConnectToProducers

const downsampleBatch = (batch: ProducerValue[]): ProducerValue[] => {
  return batch
    .filter((_, index) => index % Math.ceil(BATCH_SIZE / REDUCED_BATCH_SIZE) === 0)
    .map((producerValue) => ({
      value: producerValue.value,
      timestamp: convertTime(producerValue.timestamp as string) as Date,
    }))
}

const calculateAverage = (producer: Producer): number => {
  const total = producer.reduce((sum, value) => sum + value.value, 0)
  return producer.length > 0 ? total / producer.length : 0
}