import { OSM } from './leaflet-osm';
import maestrazgo from './maestrazgo.xml?raw';

export const addMaestrazgo = (map) => {
  const xml = (new window.DOMParser()).parseFromString(maestrazgo, 'text/xml');
  const layer = new OSM.DataLayer(xml).addTo(map);
  return layer;
};

export const parseXMLToBorders = (): Array<{ latitude: number; longitude: number }[]> => {
  const parser = new window.DOMParser();
  const xmlDoc = parser.parseFromString(maestrazgo, 'text/xml');

  const nodes: Record<string, { latitude: number; longitude: number }> = {};
  const borders: Array<{ latitude: number; longitude: number }[]> = [];

  // Extract nodes
  xmlDoc.querySelectorAll('node').forEach((node) => {
    const id = node.getAttribute('id');
    const latitude = parseFloat(node.getAttribute('lat')!);
    const longitude = parseFloat(node.getAttribute('lon')!);
    if (id) nodes[id] = { latitude, longitude };
  });

  // Extract ways (borders)
  xmlDoc.querySelectorAll('way').forEach((way) => {
    const border: { latitude: number; longitude: number }[] = [];
    way.querySelectorAll('nd').forEach((nd) => {
      const ref = nd.getAttribute('ref');
      if (ref && nodes[ref]) {
        border.push(nodes[ref]);
      }
    });
    if (border.length > 0) borders.push(border);
  });

  return borders;
};
