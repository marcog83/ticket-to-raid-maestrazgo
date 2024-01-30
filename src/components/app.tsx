import { Route, Routes } from 'react-router-dom';
import { Map } from './map/map';

export const App = () => (
  <Routes>
    <Route index path="map" element={<Map />} />
  </Routes>
);
