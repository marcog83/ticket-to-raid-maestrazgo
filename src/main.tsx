import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';
import './reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/ticket-to-raid-maestrazgo">
    <App />
  </BrowserRouter>,
);
