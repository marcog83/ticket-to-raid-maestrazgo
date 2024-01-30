import { FC, createContext, useContext, useMemo } from 'react';
import { Data } from '../data/get-data';
import { getGraph } from '../data/get-graph';

const graph = getGraph(Data);
const GraphContext = createContext();

export const useGraph = () => useContext(GraphContext);

export const GraphProvider:FC = ({ children }) => {
  const manager = useMemo(() => ({ data: Data, graph }), [ ]);
  return (
    <GraphContext.Provider value={manager}>
      {children}
    </GraphContext.Provider>
  );
};
