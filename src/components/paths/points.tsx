import { useState } from 'react';
import { useGraph } from '../../context/graph';
import { findShortestPaths } from '../../data/find-shortest-paths';
import styles from './points.module.css';

export const Points = () => {
  const graph = useGraph();
  const [ shortestPaths ] = useState(() => findShortestPaths(graph));
  return (
    <div className={styles.routes}>

      {shortestPaths.map(([ weight, ...path ]) => (
        <div className={styles.route}>
          <details className={styles.details}>
            <summary className={styles.summary}>
              <span className={styles.routeWeight}>{weight}</span>
              <div className={styles.routeLabel}>

                <span>{path[0]}</span>
                <span> → </span>
                <span>{path.at(-1)}</span>

              </div>
            </summary>
            <div className={styles.routeRow}>
              {path.map((city) => <span className={styles.routeCity}>{city}</span>)}
            </div>
          </details>

        </div>
      ))}
    </div>
  );
};
