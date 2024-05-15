import { connection } from './db';
import { Connections } from './tables.constants';

export function findConnection(from:number, to:number) {
  return connection.select({
    from: Connections,
    where: {
      or: [
        {
          from,
          to,
        },
        {
          from: to,
          to: from,
        },
      ],
    },
  });
}
