import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import { edgePathFromNodePath } from 'graphology-shortest-path/utils';
import edgeBetweennessCentrality from 'graphology-metrics/centrality/edge-betweenness';
import { useGraph } from '../../context/graph';
import { Data } from '../../data/get-data';

export const PathsCentrality = ({ paths }) => {
  const graph = useGraph();
  const nodeBetweenness = graph.order ? betweennessCentrality(graph, { normalized: true }) : {};
  const edgeBetweenness = graph.order ? edgeBetweennessCentrality(graph, { normalized: true }) : {};

  const weightedDegree = {};

  graph.forEachNode((node, attributes) => {
    let degree = 0;
    graph.forEachNeighbor(node, (neighbor, edge, edgeAttributes) => {
      degree += graph.getEdgeAttribute(node, neighbor, 'weight') || 1;
    });
    weightedDegree[node] = degree;
  });

  const criticalRoutes = [];

  graph.forEachEdge((edge, attributes) => {
    const source = graph.source(edge);
    const target = graph.target(edge);
    const { weight } = attributes;

    const routeCriticality = edgeBetweenness[edge]
                            + weightedDegree[source]
                            + weightedDegree[target]
                            + (graph.degree(source) + graph.degree(target));

    criticalRoutes.push({
      edge,
      source: Data.find((place) => place.id === Number(source))?.name,
      target: Data.find((place) => place.id === Number(target))?.name,
      weight,
      betweenness: edgeBetweenness[edge],
      weightedDegree: weightedDegree[source] + weightedDegree[target],
      totalCriticality: routeCriticality,
    });
  });
  // Sort routes by their total criticality
  criticalRoutes.sort((a, b) => b.totalCriticality - a.totalCriticality);

  // Display the top critical routes
  console.log('Top Critical Routes:', criticalRoutes.slice(0, 10));
  const results = paths.map(([ weight, id, ...rest ]) => {
    let pathCentrality = 0;
    const path = rest.map((name) => Data.find((place) => place.name === name)!.id);
    // Sum node centrality
    path.forEach((node) => {
      pathCentrality += nodeBetweenness[node];
    });

    // Sum edge centrality
    edgePathFromNodePath(graph, path).forEach((edge) => {
      pathCentrality += edgeBetweenness[edge];
    });

    return {
      weight,
      path: rest,
      pathCentrality,
    };
  }).toSorted((a, b) => b.pathCentrality - a.pathCentrality);
  return results.map(({ path, pathCentrality }) => (
    <div>
      <strong>{pathCentrality.toFixed(2)}</strong>
      <span>{path.join(' - ')}</span>
    </div>
  ));
};
