import { Map } from './map';
import styles from './map-view.module.css';
import { Stats } from '../paths/stats';

export const MapView = () => (
  <div className={styles.mapView}>

    <div className={styles.mapContainer}>
      <Map />
    </div>
    <Stats />
  </div>
);
