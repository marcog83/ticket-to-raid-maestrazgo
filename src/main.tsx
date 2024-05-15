import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';

import { initJsStore } from './data/db';
import './reset.css';
import './base.css';

initJsStore(() => {
  console.log("FIN")
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/ticket-to-raid-maestrazgo">
      <App />
    </BrowserRouter>,
  );
});
