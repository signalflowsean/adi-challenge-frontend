import React, { useState } from 'react'
import { useProducers } from '../producers/ProducersProvider'
import { COLOR_SCHEME, NUM_PRODUCERS } from '../../constants'
import * as d3 from 'd3'

const onToggleVisibility = (producerIndex: number, visible: boolean) => {
  d3.select(`.line-${producerIndex}`)
    .transition()
    .duration(500)
    .style('visibility', visible ? 'visible' : 'hidden')
}

const onToggleAll = (visible: boolean) => {
  d3.selectAll('.line')
    .transition()
    .duration(500)
    .style('visibility', visible ? 'visible' : 'hidden')
}

const Legend: React.FC = () => {
  const { averages } = useProducers()
  const [visibility, setVisibility] = useState<boolean[]>(Array(NUM_PRODUCERS).fill(true))

  const handleToggle = (index: number) => {
    const updatedVisibility = [...visibility]
    updatedVisibility[index] = !updatedVisibility[index]
    setVisibility(updatedVisibility)
    onToggleVisibility(index, updatedVisibility[index])
  }

  const handleToggleAll = (visible: boolean) => {
    const updatedVisibility = Array(NUM_PRODUCERS).fill(visible)
    setVisibility(updatedVisibility)
    onToggleAll(visible)
  }

  return (
    <section className="legend-wrapper">
      <div className="legend-header">
        <button onClick={() => handleToggleAll(true)}>Show All</button>
        <button onClick={() => handleToggleAll(false)}>Hide All</button>
      </div>
      <ul>
        {Array.from({ length: NUM_PRODUCERS }, (_, i) => (
          <LegendItem
            key={i}
            producerIndex={i}
            visible={visibility[i]}
            onToggle={handleToggle}
            average={averages[i]}
            color={COLOR_SCHEME[i % NUM_PRODUCERS]}
          />
        ))}
      </ul>
    </section>
  )
}

type LegendItemProps = {
  producerIndex: number
  visible: boolean
  onToggle: (index: number) => void
  average: number
  color: string
}

const LegendItem = ({ producerIndex, visible, onToggle, average, color }: LegendItemProps) => {
  return (
    <li
      className="legend-item-wrapper"
      key={producerIndex}
      style={{ accentColor: color}}
    >
      <label
        className="legend-item-label"
        htmlFor={`producer-${producerIndex}-visibility`}
      >
        Producer {producerIndex + 1}
      </label>
      <p className="legend-item-average">
        <span 
          className="legend-item-average-symbol"
          style={{ color }}
        >x̄&nbsp;&nbsp;</span>
        <span>{ average.toFixed(1).padEnd(3, "0")}</span>
      </p>
      <input
        type="checkbox"
        checked={visible}
        name={`producer-${producerIndex}-visibility`}
        onChange={() => onToggle(producerIndex)}
        className="legend-item-checkbox"
      />
    </li>
  )
}

export default Legend