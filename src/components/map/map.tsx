import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { getColorByWeight } from './get-color-by-weight';
import styles from './map.module.css';
import { useGraph } from '../../context/graph';

export const Map = () => {
  const graph = useGraph();

  return (
    <MapContainer
      className={styles.map}
      center={[ 40.68708, -0.32161 ]}
      zoom={11}
      maxZoom={19}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        graph.mapNodes((node, attributes) => (
          <Marker
            key={node}
            position={[ attributes.latitude, attributes.longitude ]}
          >
            <Tooltip>
              {attributes.label}
            </Tooltip>
          </Marker>
        ))
      }
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
                weight: 7,
                dashOffset: 10,
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

    </MapContainer>
  );

  // return <div id="mapid" className={styles.map} />;
};
