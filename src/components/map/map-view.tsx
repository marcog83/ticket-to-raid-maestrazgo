import styles from './map-view.module.css';
import { Stats } from '../paths/stats';
import { GraphVisualization } from './graph-visualization';

export const MapView = () => (
  <div className={styles.mapView}>

    <div className={styles.mapContainer}>
      <GraphVisualization />
    </div>
    <Stats />
  </div>
);
