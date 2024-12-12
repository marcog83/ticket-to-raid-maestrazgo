// import routes from './saved-routes.csv?raw';
import routes from './suggested_routes.csv?raw';

export const getSavedRoutes = () => routes.split('\n')
  .slice(1)
  .map((line) => {
    const [ id ] = line.split(',');
    return parseInt(id, 10);
  });
