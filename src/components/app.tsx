import { Route, Routes } from 'react-router-dom';
import { GraphProvider } from '../context/graph';
import { Points } from './paths/points';
import { MapView } from './map/map-view';

export const App = () => (
  <GraphProvider>
    <Routes>
      <Route index path="/" element={<MapView />} />
      <Route path="points" element={<Points />} />
    </Routes>
  </GraphProvider>

);
