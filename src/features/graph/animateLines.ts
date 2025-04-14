// import { producers } from "../producers/connectToProducers"
import { Lines } from './types'
import { Producers } from '../producers/types'

const animateLines = (_lines: Lines, producers: Producers) => {
  const { lines, valueLine } = _lines
  for (let i = 0; i < producers.length; i++) {
    const producer = producers[i]
    const line = lines[i]

        
    line.datum(producer)
      .attr('d', valueLine)

  }

}

export default animateLines