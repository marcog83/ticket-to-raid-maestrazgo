import preDefinedRoutes from './predefined-routes.csv?raw';

export const PredefinedRoutes = preDefinedRoutes.split('\n')
  .map(([ name, ...nodes ]) => ({
    name,
    nodes,
  }));
