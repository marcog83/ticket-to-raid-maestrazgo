import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';
import { Data } from '../../data/get-data';

export const BetweennessCentrality = () => {
  const graph = useGraph();
  const betweenness = graph.order ? betweennessCentrality(graph) : {};
  const results = Object.entries(betweenness).map(([ id, value ]) => ({
    name: Data.find((item) => item.id === Number(id))!.name,
    value: Number((value * 100).toFixed(2)),
  })).sort((a, b) => b.value - a.value);

  return (
    <StatContent
      title="Betweenness Centrality"
      tooltip="Who keeps the graph connected? Counts of the number of shortest paths that cross through a node"
      results={results}
    />
  );
};
