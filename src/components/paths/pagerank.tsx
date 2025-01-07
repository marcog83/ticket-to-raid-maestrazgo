import pagerank from 'graphology-metrics/centrality/pagerank';
import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';
import { getName } from '../../context/get-name';

export const Pagerank = () => {
  const graph = useGraph();
  const scores = graph.order ? pagerank(graph) : {};
  const results = Object.entries(scores).map(([ id, value ]) => ({
    name: getName(id),
    value: Number((value * 100).toFixed(2)),
  })).sort((a, b) => b.value - a.value);
  return (
    <StatContent
      title="Pagerank"
      tooltip="Which nodes are most important in the Graph?"
      results={results}
    />
  );
};
