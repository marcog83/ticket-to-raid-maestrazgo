import eigenvectorCentrality from 'graphology-metrics/centrality/eigenvector';
import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';
import { getName } from '../../context/get-name';

export const EigenvectorCentrality = () => {
  const graph = useGraph();
  let centrality = {};
  let results = [];
  try {
    centrality = graph.order ? eigenvectorCentrality(graph) : {};
    results = Object.entries(centrality).map(([ id, value ]) => ({
      name: getName(id),
      value: Number((Number(value) * 100).toFixed(2)),
    })).sort((a, b) => b.value - a.value);
  } catch (e) {
    return <p>Cannot Converge</p>;
  }

  return (
    <StatContent
      title="Eigenvector Centrality"
      tooltip="Who has most influence over the whole graph?"
      results={results}
    />
  );
};
