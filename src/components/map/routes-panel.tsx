import { useGraph } from '../../context/graph';
import { getPredefinedRoutes } from '../../data/get-predefined-routes';
import styles from './routes-panel.module.css';

export const RoutesPanel = () => {
  const graph = useGraph();
  const routes = getPredefinedRoutes(graph);
  return (
    <div className={styles.panel}>
      <div>
        {routes.map((route) => <Route {...route} />)}
      </div>

    </div>
  );
};

const Route = ({ name, nodes, weight }) => (
  <div>
    <p>
      <span>{name }</span>
      <strong>{weight}</strong>
    </p>
    <ul>
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
