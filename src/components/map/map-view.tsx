import { Map } from './map';
import { RoutesPanel } from './routes-panel';
import styles from './map-view.module.css';
import { Stats } from '../paths/stats';

export const MapView = () => (
  <div className={styles.mapView}>
    <RoutesPanel />
    <div className={styles.mapContainer}>
      <Map />
    </div>
    <Stats />
  </div>
);
