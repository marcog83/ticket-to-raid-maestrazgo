import pagerank from 'graphology-metrics/centrality/pagerank';
import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';
import { Data } from '../../data/get-data';

export const Pagerank = () => {
  const graph = useGraph();
  const scores = graph.order ? pagerank(graph) : {};
  const results = Object.entries(scores).map(([ id, value ]) => ({
    name: Data.find((item) => item.id === Number(id))!.name,
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
