import { FC } from 'react';
import styles from './stats.module.css';
import points from './points.module.css';
import { Tooltip } from './tooltip';

export const StatContent:FC<{
  title:string,
  tooltip:string,
  results:{ name:string, value:number }[] }> = ({
  title,
  tooltip,
  results }) => (
    <details open className={points.details}>
      <summary className={`${ styles.summary } ${ points.summary }`}>
        <Tooltip tooltip={tooltip}>
          <h2>{title}</h2>
        </Tooltip>

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
);
