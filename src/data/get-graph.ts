import { UndirectedGraph } from 'graphology';
import routes from './routes-def.csv?raw';
import { DataItem } from './get-data';

export const routesAndWeight = routes.split('\n')
  .slice(1)
  .map((line) => {
    const [ from, to, placeFrom, placeTo, weight ] = line.split(',');
    return {
      id: [ from, to ].sort().join('_'),
      from: parseInt(from, 10),
      to: parseInt(to, 10),
      weight: parseInt(weight, 10),
      placeFrom,
      placeTo,
    };
  });

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
