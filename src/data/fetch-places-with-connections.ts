/* eslint-disable no-await-in-loop */
import { IConnection, Place } from './data.types';
import { connection } from './db';
import { Connections, Places } from './tables.constants';

export async function fetchPlacesWithConnections() {
  const results = [];
  // Step 1: Fetch all places
  const places = await connection.select<Place>({
    from: Places,
  });

  // Step 2: For each place, fetch its connections
  for (const place of places) {
    // Fetch connections where current place is either in to or from
    const connections = await connection.select<IConnection>({
      from: Connections,
      where: {
        from: place.id,
        or: {
          to: place.id,
        },
      },
      join: [
        {
          with: Places,
          on: 'Connections.from = Places.id',
          as: {
            id: 'placeId', // Alias for the id column from Places table
            name: 'place_name', // You can also alias other columns for clarity
          },
          type: 'left',
        },
      ],
    });

    // Map connections to include only relevant details, e.g., connected place's name or id
    results.push({
      ...place,
      connections,
    });
  }

  console.log('Places with their connections:', results);
  return results;
}
