import cities from './aventureros-a-bordon-nodes.csv?raw';

export type DataItem = {
  name: string;
  id: number;
  connections: number[];
  latitude: string;
  longitude: string;
};

export const getData = () => {
  // Split the file content by new lines to get each row as a separate string
  const data:DataItem[] = cities.split('\n')
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

  // eslint-disable-next-line no-console
  console.log('CSV file successfully processed');

  return data;
};
