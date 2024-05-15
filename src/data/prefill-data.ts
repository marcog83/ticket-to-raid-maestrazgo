import { Connection } from 'jsstore';
import { Data } from './get-data';
import { Connections, Places } from './tables.constants';
import { routesAndWeight } from './get-graph';
import { IConnection, Place } from './data.types';

export const prefillData = async (connection:Connection) => {
  await connection.insert<Place>({
    into: Places,
    values: Data.map(({ name, latitude, longitude }) => ({
      name, latitude, longitude,
    })),
    return: true,
  });
  // Retrieve all places to build a name-ID mapping
  const places = await connection.select<Place>({ from: Places });

  const nameToIdMap = places.reduce((acc, current) => {
    acc[current.name] = current.id;
    return acc;
  }, {} as Record<string, number>);

  // Create connectionsData based on names and the mapping
  const connectionsData:IConnection[] = [];
  Data.forEach((place) => {
    const sourceId = nameToIdMap[place.name];
    place.connections.forEach((connId) => {
      const { id: connectionId, name: connectionName } = Data.find(({ id }) => id === connId) ?? {};
      const connectedPlaceId = nameToIdMap[connectionName];
      if (connectedPlaceId) { // Ensure the connected place was found
        // Ensure the connection is only added once, in a consistent order
        const connectionPair = [ sourceId, connectedPlaceId ].sort((a, b) => a - b);
        // Check if this connection (or its inverse) already exists
        if (!connectionsData.some((conn) => conn.from === connectionPair[0]
        && conn.to === connectionPair[1])) {
          const { weight } = routesAndWeight.find(
            (route) => [ route.from, route.to ].sort().join('-') === [ place.id, connectionId ].sort().join('-'),
          );
          connectionsData.push({
            from: connectionPair[0],
            to: connectionPair[1],
            weight,
          });
        }
      } else {
        throw new Error('Something went wrong');
      }
    });
  });
  // Insert connections data
  await connection.insert<IConnection>({
    into: Connections,
    values: connectionsData,
  });
};
