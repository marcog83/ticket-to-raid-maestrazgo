import { Route, Routes } from 'react-router-dom';
import { Map } from './map/map';
import { GraphProvider } from '../context/graph';
import { Points } from './paths/points';

export const App = () => (
  <GraphProvider>
    <Routes>
      <Route index path="map" element={<Map />} />
      <Route path="points" element={<Points />} />
    </Routes>
  </GraphProvider>

);
