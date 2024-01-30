/* eslint-disable @typescript-eslint/no-shadow */
import { UndirectedGraph } from 'graphology';
import { singleSource, edgePathFromNodePath } from 'graphology-shortest-path';
import { getName } from '../context/get-name';

export const findShortestPaths = (graph: UndirectedGraph) => {
  const results = {};
  const uniquePathsSet = new Set(); // Set to track unique paths

  graph.forEachNode((node) => {
    const paths = singleSource(graph, node);
    const tmp = Object.entries(paths).reduce((acc, [ , nodePath ]) => {
      if (nodePath.length <= 1) return acc;
      const weight = edgePathFromNodePath(graph, nodePath).reduce((acc, edge) => {
        const weight: number = graph.getEdgeAttribute(edge, 'weight');
        return acc + weight;
      }, 0);

      // Create a canonical form of the path (sorted)
      const canonicalPath = nodePath.slice().sort().join('-');
      if (uniquePathsSet.has(canonicalPath)) {
        return acc; // Skip this path as it's a duplicate
      }
      uniquePathsSet.add(canonicalPath);

      return [
        ...acc, {
          weight,
          path: nodePath,
        },
      ];
    }, []);
    results[node] = tmp;
  });

  const shortest = Object.keys(results).map((node) => {
    const paths = results[node];
    const line = paths.map((path) => [ path.weight, ...path.path.map(getName) ]);
    return line;
  }).flat().sort((a, b) => a[0] - b[0]);

  return shortest;
};
