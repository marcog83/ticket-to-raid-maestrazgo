// import routes from './saved-routes.csv?raw';
import Papa from 'papaparse';
import routes from './suggested_routes.csv?raw';
// 650,4,La Todolella,Morron
type Route = {
  id:number,
  weight:number,
  sourceName:string,
  destName:string
};
// Parse the CSV into a structured array of objects
const parseResult = Papa.parse<Route>(routes, {
  header: true,
  skipEmptyLines: true,
});

export const getSavedRoutes = () => parseResult.data.map(({ id }) => parseInt(id, 10));
