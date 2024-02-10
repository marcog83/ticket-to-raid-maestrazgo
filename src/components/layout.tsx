import { Link, Outlet } from 'react-router-dom';

import styles from './layout.module.css';

export const Layout = () => (
  <div>

    <nav>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/map">Map</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/points">Points</Link>
        </li>

      </ul>
    </nav>

    <Outlet />
  </div>
);
