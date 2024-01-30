import { edgePathFromNodePath } from 'graphology-shortest-path';
import { getName } from '../context/get-name';
import preDefinedRoutes from './predefined-routes.csv?raw';

export const getPredefinedRoutes = (graph) => preDefinedRoutes.split('\n')
  .map((line) => {
    const [ name, ...nodes ] = line.split(',');
    const weight = edgePathFromNodePath(graph, nodes).reduce((acc, edge) => {
      const weight = graph.getEdgeAttribute(edge, 'weight');
      return acc + parseInt(weight, 10);
    }, 0);
    return ({
      name,
      nodes: nodes.map(getName),
      weight,
    });
  });
