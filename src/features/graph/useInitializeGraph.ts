import * as d3 from 'd3'
import { RefObject, useLayoutEffect, useState } from 'react'
import { GraphContainer, Lines, AxesSvg, Axes, Domains, LineData } from './types'
import { MARGIN, NUM_PRODUCERS, HEIGHT } from '../../constants'
import { ProducerValue } from '../producers/types'

const { left: marginLeft, right: marginRight, top: marginTop } = MARGIN
let width: number = 0

const createAxesSvg = (graphContainer: GraphContainer): AxesSvg => {
  const xAxisSvg = 
    graphContainer
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${HEIGHT - marginTop})`)
      .style('font-size','1.5rem')
      .style('font-weight','bold')
      .style('color','white')

  const yAxisSvg =
    graphContainer
      .append('g')
      .attr('class', 'y axis')
      .style('font-size','1.5rem')
      .style('font-weight','bold')
      .style('color','white')

  return { xAxisSvg, yAxisSvg }
}

const initializeDomains = (): Domains => {
  const xScale = d3.scaleTime().range([0, width])
  const yScale = d3.scaleLinear().range([HEIGHT - marginLeft, 0])

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(d3.timeSecond.every(1), d3.utcFormat('%M:%S'))

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)

  return { xScale, yScale, xAxis, yAxis }
}

const createProducerLines = (graphContainer: GraphContainer): Lines =>
  Array.from({ length: NUM_PRODUCERS }, (_, i) =>
    graphContainer
      .append('path')
      .attr('class', `line line-${i}`)
      .style('stroke', d3.schemeCategory10[i])
      .style('fill', 'none')
      .style('stroke-width', 2)
  )

export type initializeGraphReturnType = {
  graphContainer: GraphContainer | null
  axes: Axes | null
  lineData: LineData
}

const useInitializeGraph = (ref: RefObject<SVGSVGElement | null>): initializeGraphReturnType => {
  const [graphContainer, setGraphContainer] = useState<GraphContainer | null>(null)
  const [axes, setAxes] = useState<Axes | null >(null)
  const [lineData, setLineData] = useState<LineData>({
    lines: [],
    valueLine: d3.line<ProducerValue>()
  })
  
  useLayoutEffect(() => {
    if (!ref.current) return
    width = ref.current.clientWidth

    const graphContainer = d3
      .select(ref.current) 
      .append('g')
      .attr('transform', `translate(${marginLeft + marginRight}, ${0})`)

    const axes = createAxesSvg(graphContainer)
    const domains = initializeDomains()
    const { xScale, yScale } = domains

    const lines = createProducerLines(graphContainer)
    const valueLine = d3.line<ProducerValue>()
      .x((d: ProducerValue) => xScale(d.timestamp as Date))
      .y((d: ProducerValue) => yScale(d.value));

    setGraphContainer(graphContainer)
    setAxes({...domains, ...axes})
    setLineData({lines, valueLine})
  }, [!!ref])
  
  return { graphContainer, lineData, axes }
}


export default useInitializeGraph