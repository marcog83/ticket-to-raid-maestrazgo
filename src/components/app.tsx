import { Route, Routes } from 'react-router-dom';
import { GraphProvider } from '../context/graph';
import { Points } from './paths/points';
import { MapView } from './map/map-view';
import { Data } from '../data/get-data';

export const App = () => (
  <GraphProvider data={Data}>
    <Routes>
      <Route index path="/" element={<MapView />} />
      <Route path="points" element={<Points />} />
    </Routes>
  </GraphProvider>

);
