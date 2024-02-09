import { FC } from 'react';
import styles from './route.module.css';

export const Route:FC<{ name:string, nodes:string[], weight:number }> = ({ name, nodes, weight }) => (
  <div className={styles.route}>
    <p className={styles.routeTitle}>
      <strong className={styles.routeTitleNumber}>{weight}</strong>
      <span className={styles.routeTitleLabel}>{name }</span>

    </p>
    <ul className={styles.routeParts}>
      {
        nodes.map((node:any) => (
          <li key={node}>
            {
            node
        }
          </li>
        ))
      }
    </ul>
  </div>
);
