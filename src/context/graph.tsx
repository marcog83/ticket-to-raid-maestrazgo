import { FC, ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { UndirectedGraph } from 'graphology';
import { Data, DataItem } from '../data/get-data';
import { getGraph } from '../data/get-graph';
import { connection } from '../data/db';
import { Places } from '../data/tables.constants';
import { fetchPlacesWithConnections } from '../data/fetch-places-with-connections';

const GraphContext = createContext({} as UndirectedGraph);

export const useGraph = () => useContext(GraphContext);

export const GraphProvider:FC<{ children: ReactNode, data:DataItem[] }> = ({ children, data = Data }) => {
  useEffect(() => {
    const load = async () => {
      const places = await fetchPlacesWithConnections();
    };
    load();
  }, []);

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
