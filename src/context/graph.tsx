import { FC, createContext, useContext, useMemo } from 'react';
import { getData } from '../data/get-data';
import { getGraph } from '../data/get-graph';

const data = getData();

const graph = getGraph(data);
const GraphContext = createContext();

export const useGraph = () => useContext(GraphContext);

export const GraphProvider:FC = ({ children }) => {
  const manager = useMemo(() => ({ data, graph }), [ ]);
  return (
    <GraphContext.Provider value={manager}>
      {children}
    </GraphContext.Provider>
  );
};
