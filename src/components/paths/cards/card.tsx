import { FC } from 'react';
import { MapContainer, CircleMarker, Polyline } from 'react-leaflet';
import { Data } from '../../../data/get-data';
import styles from './card.module.css';
import { addMaestrazgo } from './perimeter';

export const Bounds = [
  [ 40.54511315470123, -0.7161712646484376 ],
  [ 40.82835864973048, 0.07278442382812501 ],
];

export const Card:FC<{ card:any[] }> = ({ card }) => {
  const title = `${ card[2] } - ${ card.at(-1) }`;

  const source = Data.find((place) => place.name === card[2])!;
  const destination = Data.find((place) => place.name === card.at(-1))!;
  const latlngs = [
    [ source.latitude, source.longitude ],
    [ destination.latitude, destination.longitude ],
  ];
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.points}>{card[0]}</div>
        <div>{title}</div>
      </header>

      <div className={styles.mapContainer}>
        <MapContainer
          scrollWheelZoom={false}
          className={styles.mapContainer}
          center={[ 40.68708, -0.32161 ]}
          zoom={9}
          whenReady={({ target }) => {
            setTimeout(() => {
              target.invalidateSize();
              const layer = addMaestrazgo(target);
              target.fitBounds(layer.getBounds());
            });
          }}
        >

          <CircleMarker
            title={source.name}
            center={[ source.latitude, source.longitude ]}
            radius={8}
          />
          <CircleMarker
            title={destination.name}
            center={[ destination.latitude, destination.longitude ]}
            radius={8}
          />
          <Polyline
            pathOptions={{
              weight: 4,

              color: '#ffcc00',
            }}
            positions={latlngs}
          />
        </MapContainer>
      </div>
    </div>
  );
};
