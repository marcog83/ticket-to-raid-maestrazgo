import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { UndirectedGraph } from 'graphology';
import { Data, DataItem } from '../data/get-data';
import { getGraph } from '../data/get-graph';

const GraphContext = createContext({} as UndirectedGraph);

export const useGraph = () => useContext(GraphContext);

export const GraphProvider:FC<{ children: ReactNode, data:DataItem[] }> = ({ children, data = Data }) => {
  const manager = useMemo(() => {
    const graph = getGraph(data);
    return graph;
  }, [ data ]);
  return (
    <GraphContext.Provider value={manager}>
      {children}
    </GraphContext.Provider>
  );
};
