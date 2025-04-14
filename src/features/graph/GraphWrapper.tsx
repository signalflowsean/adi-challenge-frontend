import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const GraphWrapper = ({ children } : Props ) => {
  return (
    <div className="graph-wrapper">
      {children}
    </div>
  )
}

export default GraphWrapper