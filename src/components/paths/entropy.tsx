import { useGraph } from '../../context/graph';
import { StatContent } from './stat-content';
import points from './points.module.css';
import styles from './stats.module.css';
import { Figures } from './figures';

export const Entropy = ({ selectedIds, groups }) => {
  const graph = useGraph();
  // Step 1: Count frequencies of start/end points
  const nodeFrequencies = {};
  graph.forEachNode((node) => {
    nodeFrequencies[node] = 0;
  });

  graph.forEachEdge((edge, attributes, source, target) => {
    if (selectedIds.has(Number(source))) {
      nodeFrequencies[source]++;
    }
    if (selectedIds.has(Number(target))) {
      nodeFrequencies[target]++;
    }
  });

  // Step 2: Convert frequencies to probabilities
  const totalEdges = graph.order; // total number of nodes
  const probabilities = Object.values(nodeFrequencies).map((freq) => freq / totalEdges);

  // Step 3: Calculate entropy
  const entropy = probabilities.reduce((acc, p) => {
    if (p > 0) {
      acc -= p * Math.log2(p);
    }
    return acc;
  }, 0);

  return (
    <details open className={points.details}>
      <summary className={`${ styles.summary } ${ points.summary }`}>
        <h2>Stats</h2>

      </summary>
      <ul className={styles.statsContent}>
        <li>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{entropy.toFixed(3)}</span>
            <span className={styles.statLabel}>Entropy</span>
          </div>

        </li>
        <li>
          <div>
            <Figures selectedIds={selectedIds} groups={groups} />
          </div>
        </li>
      </ul>
    </details>
  );
};
