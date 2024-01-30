import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getColorByWeight } from './get-color-by-weight';
import styles from './map.module.css';
import { useGraph } from '../../context/graph';

export const Map = () => {
  const { graph } = useGraph();
  useEffect(() => {
    const map = L.map('mapid').setView([ 40.68708, -0.32161 ], 10);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add nodes to the map
    graph.forEachNode((_, attributes) => {
      L.marker([ attributes.latitude, attributes.longitude ]).addTo(map)
        .bindPopup(attributes.label);
    });

    // Add edges to the map
    graph.forEachEdge((
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
      L.polyline(latlngs, {
        weight: 7,
        color: getColorByWeight(attributes.weight),
      })
        .bindTooltip(`Weight: ${ attributes.weight }`, { permanent: false, direction: 'auto' })
        .addTo(map);
    });
  }, [ graph ]);
  return <div id="mapid" className={styles.map} />;
};
