import styles from './route.module.css';

export const Route = ({ name, nodes, weight }) => (
  <div className={styles.route}>
    <p className={styles.routeTitle}>
      <strong className={styles.routeTitleNumber}>{weight}</strong>
      <span className={styles.routeTitleLabel}>{name }</span>

    </p>
    <ul className={styles.routeParts}>
      {
            nodes.map((node) => (
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
