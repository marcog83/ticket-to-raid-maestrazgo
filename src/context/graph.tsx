import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { Data } from '../data/get-data';
import { getGraph } from '../data/get-graph';

const graph = getGraph(Data);
const GraphContext = createContext(graph);

export const useGraph = () => useContext(GraphContext);

export const GraphProvider:FC<{ children: ReactNode }> = ({ children }) => {
  const manager = useMemo(() => graph, [ ]);
  return (
    <GraphContext.Provider value={manager}>
      {children}
    </GraphContext.Provider>
  );
};
