import { useGraph } from '../../context/graph';
import styles from './stats.module.css';

export const Stats = () => {
  const graph = useGraph();

  const centrality = graph.mapNodes((node, attributes) => ({
    name: attributes.name,
    degree: graph.degree(node),
  })).sort((a, b) => b.degree - a.degree);

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
      <details>
        <summary>
          <h2>Betweenness Centrality</h2>
          {' '}
        </summary>
        <ul>
          <li>TODO</li>
        </ul>
      </details>

    </div>
  );
};
