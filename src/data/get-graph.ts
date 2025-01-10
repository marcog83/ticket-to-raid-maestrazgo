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
  from: edge.sourceId,
  to: edge.targetId,
  weight: parseInt(edge.weight, 10),
  placeFrom: edge.sourceName,
  placeTo: edge.targetName,
}));

export const findWeight = (from:number, to:number) => {
  const idFind = [ from, to ].sort().join('_');
  return routesAndWeight.find(({ id }) => id === idFind)?.weight;
};

export const getGraph = (data:DataItem[]) => {
  // Convert coordinates to pixels
  const mapWidth = 2024;
  const mapHeight = 2024;
  const [ minLongitude, maxLongitude ] = [
    Math.min(...data.map((city) => parseFloat(city.longitude))),
    Math.max(...data.map((city) => parseFloat(city.longitude))),
  ];
  const [ minLatitude, maxLatitude ] = [
    Math.min(...data.map((city) => parseFloat(city.latitude))),
    Math.max(...data.map((city) => parseFloat(city.latitude))),
  ];

  const convertToPixels = (longitude: number, latitude: number): [number, number] => {
    const x = ((longitude - minLongitude) / (maxLongitude - minLongitude)) * mapWidth;
    const y = mapHeight - ((latitude - minLatitude) / (maxLatitude - minLatitude)) * mapHeight;
    return [ x, y ];
  };

  const graph = new UndirectedGraph();

  data.forEach(({ id, name, latitude, longitude }) => {
    // Add node
    if (!graph.hasNode(id)) {
      const [ x, y ] = convertToPixels(parseFloat(longitude), parseFloat(latitude));
      graph.addNode(id, {
        latitude,
        longitude,
        name,
        label: name,
        x,
        y,
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
