import cities from './aventureros-a-bordon-nodes.csv?raw';

export type DataItem = {
  name: string;
  id: number;
  connections: number[];
  latitude: string;
  longitude: string;
};

export const Data:DataItem[] = cities.split('\n')
  .map((line) => {
    const [ id, name, latitude, longitude, ...connections ] = line.split(',');
    return {
      name,
      id: parseInt(id, 10),
      connections: connections.filter(Boolean).map(Number),
      latitude,
      longitude,
    };
  });
