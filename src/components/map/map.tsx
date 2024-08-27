import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Popup, CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import { useRef } from 'react';
import { type Map as LeafletMap } from 'leaflet';
import { getColorByWeight } from './get-color-by-weight';
import styles from './map.module.css';
import { useGraph } from '../../context/graph';
import { addMaestrazgo } from '../paths/cards/perimeter';

export const Map = () => {
  const graph = useGraph();
  const refMap = useRef<LeafletMap>();
  // eslint-disable-next-line no-console
  console.log(refMap.current?.getBounds());
  return (
    <MapContainer
      className={styles.map}
      center={[ 40.68708, -0.32161 ]}
      zoom={11}
      maxZoom={19}
      whenReady={({ target }) => {
        console.log(target.getCenter());
        setTimeout(() => {
          target.invalidateSize();
          const layer = addMaestrazgo(target);
          target.fitBounds(layer.getBounds());
        });
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        graph.mapEdges((
          ___,
          attributes,
          _,
          __,
          sourceAttributes,
          targetAttributes,
        ) => {
          const latlngs = [
            [ sourceAttributes.latitude, sourceAttributes.longitude ],
            [ targetAttributes.latitude, targetAttributes.longitude ],
          ];

          return (
            <Polyline
              key={___}
              pathOptions={{
                weight: 5,
                dashOffset: '10',
                dashArray: [ 60, 20 ],
                color: getColorByWeight(attributes.weight),
              }}
              positions={latlngs}
            >
              <Tooltip>
                Pasos:
                {' '}
                {attributes.weight }
              </Tooltip>
            </Polyline>
          );
        })
      }
      {
        graph.mapNodes((node, attributes) => (
          <CircleMarker
            title={attributes.name}
            key={node}
            pathOptions={
              {
                fillColor: 'black',
                fillOpacity: 1,
                color: 'black',
              }
            }
            center={[ attributes.latitude, attributes.longitude ]}
          >
            <Popup keepInView>
              {attributes.label}
            </Popup>
          </CircleMarker>
        ))
      }

    </MapContainer>
  );

  // return <div id="mapid" className={styles.map} />;
};
