import { useState } from 'react';
import { useGraph } from '../../context/graph';
import { findShortestPaths } from '../../data/find-shortest-paths';
import styles from './points.module.css';

export const Points = () => {
  const { graph, data } = useGraph();
  const [ shortestPaths ] = useState(() => findShortestPaths(graph, data));
  return (
    <div className={styles.routes}>

      {shortestPaths.map(([ weight, ...path ]) => (
        <div className={styles.route}>
          <span className={styles.routeLabel}>{weight}</span>
          <div className={styles.routeRow}>
            {path.map((city) => <span className={styles.routeCity}>{city}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
};
