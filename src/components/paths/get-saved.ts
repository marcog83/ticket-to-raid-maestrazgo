import routes from './saved-routes.csv?raw';

export const getSavedRoutes = () => routes.split('\n')
  .map((line) => {
    const [ id ] = line.split(',');
    return parseInt(id, 10);
  });
