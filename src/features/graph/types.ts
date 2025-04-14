import { ProducerValue } from '../producers/types'
export type D3SVGGSelection = d3.Selection<SVGGElement, unknown, null, undefined>
export type GraphContainer = D3SVGGSelection
export type AxesSvg = {
  xAxisSvg: D3SVGGSelection
  yAxisSvg: D3SVGGSelection
}

export type xAxis = d3.Axis<d3.NumberValue>
export type yAxis = d3.Axis<d3.NumberValue>
export type xScale =  d3.ScaleTime<number, number, never>
export type yScale = d3.ScaleLinear<number, number, never>

export type Domains = {
  xScale: xScale
  yScale: yScale
  xAxis: xAxis
  yAxis: yAxis
}

export type Axes = {
  xAxis: xAxis
  yAxis: yAxis
  xAxisSvg: D3SVGGSelection
  yAxisSvg: D3SVGGSelection
  xScale: xScale
  yScale: yScale
}

export type Lines = d3.Selection<SVGPathElement, unknown, null, undefined>[]
export type ValueLine = d3.Line<ProducerValue>

export type LineData = { lines : Lines, valueLine: ValueLine }