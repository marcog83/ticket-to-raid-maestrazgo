import { FC } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import { Data } from '../../../data/get-data';
import styles from './card.module.css';

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
      <div>{card[0]}</div>
      <div>{title}</div>
      <div style={{ height: 300, width: 400, position: 'relative' }}>
        <MapContainer
          bounds={Bounds}
          style={{ width: 400, height: 300 }}
          center={[ 40.68708, -0.32161 ]}
          zoom={9}
          whenReady={({ target }) => {
            console.log(target);
            setTimeout(() => {
              target.invalidateSize();
            });
          }}
        >
          <TileLayer

            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            title={source.name}
            position={[ source.latitude, source.longitude ]}
          />
          <Marker
          icon={{
            icon
          }}
            title={destination.name}
            position={[ destination.latitude, destination.longitude ]}
          />
          <Polyline
            pathOptions={{
              weight: 7,

              color: '#ffcc00',
            }}
            positions={latlngs}
          />
        </MapContainer>
      </div>

    </div>
  );
};
