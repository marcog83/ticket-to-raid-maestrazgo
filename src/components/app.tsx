import { Route, Routes } from 'react-router-dom';
import { GraphProvider } from '../context/graph';
import { Points } from './paths/points';
import { MapView } from './map/map-view';
import { Data } from '../data/get-data';
import { Layout } from './layout';

export const App = () => (
  <GraphProvider data={Data}>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="map" element={<MapView />} />
        <Route path="points" element={<Points />} />
      </Route>
    </Routes>
  </GraphProvider>

);
