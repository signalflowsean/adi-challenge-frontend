import * as d3 from 'd3'
import type { LineData, D3SVGGSelection, xAxis, yAxis, xScale, yScale } from './types'
import type { Producers, ProducerValue } from '../producers/types'

export const updateDomains = (producers: Producers, xScale: xScale , yScale: yScale): void => {
  const flattendProducers = producers.flat() as ProducerValue[]
  xScale.domain(d3.extent(flattendProducers, d => d.timestamp as Date) as [Date, Date]);
  
  const yMin = d3.min(flattendProducers, producerVal => producerVal.value as number) as number;
  const yMax = d3.max(flattendProducers, producerVal => producerVal.value as number) as number;
  yScale.domain([yMin, yMax]);
}

export const updateLines = (producers: Producers, lineData: LineData): void => {
  const { lines, valueLine } = lineData
  for (let i = 0; i < producers.length; i++) {
    const producer = producers[i]
    const line = lines[i]

    line.datum(producer)
      .attr('d', valueLine)
  }
}

export const animateAxes = (xAxisSvg: D3SVGGSelection, yAxisSvg: D3SVGGSelection, xAxis: xAxis, yAxis: yAxis) => {
  xAxisSvg.transition().duration(100).call(xAxis)
  yAxisSvg.transition().duration(100).call(yAxis)
}