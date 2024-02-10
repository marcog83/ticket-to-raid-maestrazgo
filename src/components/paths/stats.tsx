import betweennessCentrality from 'graphology-metrics/centrality/betweenness';

import { useGraph } from '../../context/graph';
import styles from './stats.module.css';
import { Data } from '../../data/get-data';

export const Stats = () => {
  const graph = useGraph();

  const centrality = graph.mapNodes((node, attributes) => ({
    name: attributes.name,
    degree: graph.degree(node),
  })).sort((a, b) => b.degree - a.degree);

  const betweenness = graph.order ? betweennessCentrality(graph) : {};
  const results = Object.entries(betweenness).map(([ id, value ]) => ({
    name: Data.find((item) => item.id === Number(id))!.name,
    value: (value * 100).toFixed(2),
  })).sort((a, b) => Number(b.value) - Number(a.value));
  return (
    <div className={styles.stats}>
      <details open>
        <summary><h2>Degree Centrality</h2></summary>
        <ul className={styles.statsContent}>
          {centrality.map((city) => (
            <li key={city.name}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{city.degree}</span>
                <span className={styles.statLabel}>{city.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </details>
      <details open>
        <summary>
          <h2>Betweenness Centrality</h2>
        </summary>
        <ul className={styles.statsContent}>
          {results.map((city) => (
            <li key={city.name}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{city.value}</span>
                <span className={styles.statLabel}>{city.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </details>

    </div>
  );
};
