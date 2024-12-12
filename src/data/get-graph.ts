import { UndirectedGraph } from 'graphology';
import Papa from 'papaparse';
import routes from './routes-def.csv?raw';
import { DataItem } from './get-data';
// Build edges
interface Edge {
  sourceId: string;
  targetId: string;
  sourceName: string;
  targetName: string;
  weight: number;
}

const { data } = Papa.parse<Edge>(routes, {
  header: true,
  skipEmptyLines: true,
});

export const routesAndWeight = data.map((edge) => ({
  id: [ edge.sourceId, edge.targetId ].sort().join('_'),
  from: parseInt(edge.sourceId, 10),
  to: parseInt(edge.targetId, 10),
  weight: parseInt(edge.weight, 10),
  placeFrom: edge.sourceName,
  placeTo: edge.targetName,
}));

export const findWeight = (from:number, to:number) => {
  const idFind = [ from, to ].sort().join('_');
  return routesAndWeight.find(({ id }) => id === idFind)?.weight;
};

export const getGraph = (data:DataItem[]) => {
  const graph = new UndirectedGraph();

  data.forEach(({ id, name, latitude, longitude }) => {
    // Add node
    if (!graph.hasNode(id)) {
      graph.addNode(id, {
        latitude,
        longitude,
        name,
        label: `${ id }:: ${ name }`,
      });
    }
  });

  data.forEach(({ id, connections }) => {
    // Add edges
    connections.forEach((targetId) => {
      if (targetId) {
        // Check if targetId is not empty
        if (!graph.hasEdge(id, targetId)) {
          try {
            graph.addEdge(id, targetId, {
              label: `${ id } -> ${ targetId }`,
              weight: findWeight(id, targetId),
            });
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(id, targetId, e);
          }
        }
      }
    });
  });
  return graph;
};
