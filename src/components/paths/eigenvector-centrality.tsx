import eigenvectorCentrality from 'graphology-metrics/centrality/eigenvector';
import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';
import { Data } from '../../data/get-data';

export const EigenvectorCentrality = () => {
  const graph = useGraph();
  const centrality = graph.order ? eigenvectorCentrality(graph) : {};
  const results = Object.entries(centrality).map(([ id, value ]) => ({
    name: Data.find((item) => item.id === Number(id))!.name,
    value: Number((value * 100).toFixed(2)),
  })).sort((a, b) => b.value - a.value);

  return (
    <StatContent
      title="Eigenvector Centrality"
      tooltip="Who has most influence over the whole graph?"
      results={results}
    />
  );
};
