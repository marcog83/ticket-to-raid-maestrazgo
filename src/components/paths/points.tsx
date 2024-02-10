import { ChangeEvent, useState } from 'react';
import { GraphProvider, useGraph } from '../../context/graph';
import { findShortestPaths } from '../../data/find-shortest-paths';
import styles from './points.module.css';
import { Data } from '../../data/get-data';
import { Map } from '../map/map';

export const Points = () => {
  const graph = useGraph();
  const [ shortestPaths ] = useState(() => findShortestPaths(graph));
  const [ selectedPaths, setSelected ] = useState<number[]>([]);
  const handleChange = (add, route) => {
    setSelected((selected) => {
      let newSelected = [ ...selected ];
      if (add) {
        newSelected.push(route);
      } else {
        newSelected = newSelected
          .filter((city) => route !== city);
      }

      return newSelected;
    });
  };

  let selectedItems = selectedPaths
    .flatMap(
      (idSelected) => shortestPaths.find(([ ,id ]) => id === idSelected)?.slice(2),
    );
  const uniqueItems = [ ...new Set(selectedItems) ];
  const uniqueIds = new Set(uniqueItems.map((city) => Data.find((place) => place.name === city)?.id ?? -1));

  selectedItems = uniqueItems
    .map((name) => {
      const place = Data.find((place) => place.name === name);

      return {
        ...place,
        connections: place?.connections.filter((idConn) => uniqueIds.has(idConn)) ?? [],
      };
    });
  return (
    <div className={styles.pointsContainer}>
      <div className={styles.routes}>

        {shortestPaths.map(([ weight, id, ...path ]) => (
          <div className={styles.route} key={path.join('')}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                <span className={styles.routeWeight}>{weight}</span>
                <div className={styles.routeLabel}>

                  <span>{path[0]}</span>
                  <span> - </span>
                  <span>{path.at(-1)}</span>
                  <input
                    type="checkbox"
                    onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked, id)}
                    className={styles.checkbox}
                  />
                </div>
              </summary>
              <div className={styles.routeRow}>
                {path.map((city) => (
                  <span
                    key={city}
                    className={styles.routeCity}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </details>

          </div>
        ))}
      </div>
      <GraphProvider data={selectedItems}>
        <div className={styles.mapContainer}>

          <Map />
        </div>
      </GraphProvider>
    </div>
  );
};
