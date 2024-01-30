import { Map } from './map';
import { RoutesPanel } from './routes-panel';
import styles from './map-view.module.css';

export const MapView = () => (
  <div className={styles.mapView}>
    <RoutesPanel />
    <div className={styles.mapContainer}>
      <Map />
    </div>

  </div>
);
