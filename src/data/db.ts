/* eslint-disable no-console */
import { DATA_TYPE, Connection, IDataBase, ITable } from 'jsstore';
// eslint-disable-next-line import/extensions
import JsstoreWorker from 'jsstore/dist/jsstore.worker.min.js?worker';
import { Connections, Places } from './tables.constants';
import { prefillData } from './prefill-data';

const getDatabase = () => {
  const tblPlace:ITable = {
    name: Places,
    columns: {
      id: { primaryKey: true, autoIncrement: true },
      name: { notNull: true, dataType: DATA_TYPE.String },
      latitude: { dataType: DATA_TYPE.Number },
      longitude: { dataType: DATA_TYPE.Number },
    },
  };

  const tblConnection = {
    name: Connections,
    columns: {
      id: { primaryKey: true, autoIncrement: true },
      from: { notNull: true, dataType: DATA_TYPE.Number },
      to: { notNull: true, dataType: DATA_TYPE.Number },
      weight: { notNull: true, dataType: DATA_TYPE.Number },
    },
  };

  const dataBase: IDataBase = {
    name: 'PlacesDB',
    tables: [ tblPlace, tblConnection ],
  };
  return dataBase;
};
export const connection = new Connection(new JsstoreWorker());

connection.logStatus = true;
export const initJsStore = async (cb) => {
  try {
    const dataBase = getDatabase();
    const isDbCreated = await connection.initDb(dataBase);
    if (isDbCreated) {
      console.log('Database created');
      prefillData(connection);
    } else {
      cb();
      console.log('Database opened');
    }
  } catch (err) {
    console.error('JsStore initialization error:', err);
  }
};
