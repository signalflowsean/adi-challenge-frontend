import { createContext, useContext, ReactNode } from 'react';
import useConnectToProducers from './useConnectToProducers';
import type { Producers } from './types';

type ProducersContextType = {
  producers: Producers
  allSocketsConnected: boolean
  averages: number[]
}
export const ProducersContext = createContext<ProducersContextType>({} as ProducersContextType);
export const useProducers = (): ProducersContextType => useContext(ProducersContext);

type Props = { children: ReactNode }
export const ProducersProvider = ({ children }: Props) => {
  const producers = useConnectToProducers()

  return (
    <ProducersContext.Provider value={producers}>
      {children}
    </ProducersContext.Provider>
  );
}
