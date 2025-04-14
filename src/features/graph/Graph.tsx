import { useLayoutEffect, useRef } from 'react'
import useInitializeGraph from './useInitializeGraph'
import { useProducers } from '../producers/ProducersProvider'
import { updateDomains, updateLines, animateAxes } from './drawUtilities'
import { HEIGHT } from '../../constants' 

const Graph = () => {
  const ref = useRef<SVGSVGElement>(null)
  const { producers, allSocketsConnected } = useProducers()
  const { graphContainer, lineData, axes } = useInitializeGraph(ref)

  useLayoutEffect(() => {
    if (!graphContainer || !lineData || !axes || !allSocketsConnected) return
    
    const { xScale, yScale, xAxis, yAxis, yAxisSvg, xAxisSvg } = axes
    updateDomains(producers, xScale, yScale)
    updateLines(producers, lineData)

    // TODO: don't animate axes everytime?
    animateAxes(xAxisSvg, yAxisSvg, xAxis, yAxis)
  }, [producers, graphContainer, axes, allSocketsConnected])

  return (
    <svg 
      width="100%"
      height={HEIGHT}
      className="graph"
      id="timeseries-graph"
      ref={ref} 
    />
  )
}

export default Graph