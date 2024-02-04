import { useGraph } from '../../context/graph';
import { getPredefinedRoutes } from '../../data/get-predefined-routes';
import { Route } from './route';
import styles from './routes-panel.module.css';

export const RoutesPanel = () => {
  const graph = useGraph();
  const routes = getPredefinedRoutes(graph);
  return (
    <div className={styles.panel}>
      <div className={styles.routes}>
        {routes.map((route) => <Route key={route.name} {...route} />)}
      </div>

    </div>
  );
};
