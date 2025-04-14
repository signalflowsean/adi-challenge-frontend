import Header from './components/Header'
import GraphWrapper from './features/graph/GraphWrapper'
import Legend from './features/graph/Legend'
import Graph from './features/graph/Graph'
import { ProducersProvider } from './features/producers/ProducersProvider'

import './App.css'

const App = () => {
  return (
    <ProducersProvider>
      <Header />
      <GraphWrapper>
        <Graph />
        <Legend />
      </GraphWrapper>
    </ProducersProvider>
  )
}

export default App
