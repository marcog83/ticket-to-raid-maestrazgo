import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';

export const DegreeCentrality = () => {
  const graph = useGraph();
  const centrality = graph.mapNodes((node, attributes) => ({
    name: attributes.name,
    value: graph.degree(node),
  })).sort((a, b) => b.value - a.value);

  return (
    <StatContent
      title="Degree Centrality"
      tooltip="Who is most connected to other nodes?"
      results={centrality}
    />
  );
};
