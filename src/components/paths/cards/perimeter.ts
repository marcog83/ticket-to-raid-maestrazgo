import { OSM } from './leaflet-osm';
import maestrazgo from './maestrazgo.xml?raw';

export const addMaestrazgo = (map) => {
  const xml = (new window.DOMParser()).parseFromString(maestrazgo, 'text/xml');
  const layer = new OSM.DataLayer(xml).addTo(map);
  return layer;
};
