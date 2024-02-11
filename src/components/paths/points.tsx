import { ChangeEvent, useState } from 'react';
import { GraphProvider, useGraph } from '../../context/graph';
import { findShortestPaths } from '../../data/find-shortest-paths';
import styles from './points.module.css';
import { Data, DataItem } from '../../data/get-data';
import { Map } from '../map/map';
import { Stats } from './stats';

export const Points = () => {
  const graph = useGraph();
  const [ shortestPaths ] = useState(() => findShortestPaths(graph));
  const [ selectedPaths, setSelected ] = useState<number[]>([]);
  const handleChange = (add:boolean, route:number) => {
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

  const [ query, setQuery ] = useState('');

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const allItems = selectedPaths
    .flatMap(
      (idSelected) => shortestPaths.find(([ ,id ]) => id === idSelected)?.slice(2),
    );
  const uniqueItemsSet = new Set(selectedPaths);
  const uniqueItems = [ ...new Set(allItems) ];
  const uniqueIds = new Set(uniqueItems.map((city) => Data.find((place) => place.name === city)?.id ?? -1));

  const selectedItems:DataItem[] = uniqueItems
    .map((name) => {
      const place = Data.find((place) => place.name === name)!;

      return {
        ...place,
        connections: place?.connections.filter((idConn) => uniqueIds.has(idConn)) ?? [],
      };
    });

  const handleSave = () => {
    const results = shortestPaths.filter(([ ,id ]) => uniqueItemsSet.has(Number(id)))
      .map(([ weight, id, first, ...path ]) => [ id, weight, first, path.at(-1) ].join(','))
      .join('\n');
    // Copy the text inside the text field
    navigator.clipboard.writeText(results);

    // Alert the copied text
    // eslint-disable-next-line no-alert
    alert(`Copied the text: ${ results }`);
  };
  return (
    <div className={styles.pointsContainer}>
      <div className={styles.routes}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchInput}
            value={query}
            onChange={handleSearch}
          />
          <button type="button" onClick={handleSave}>SAVE</button>
        </div>
        {shortestPaths
          .sort(([ , a ], [ , b ]) => {
            const compare = -Number(uniqueItemsSet.has(Number(a))) + Number(uniqueItemsSet.has(Number(b)));

            return compare;
          })
          .filter(([ weight, id, first, ...path ]) => {
            if (uniqueItemsSet.has(Number(id))) return true;
            if (!query) return true;
            if (!Number.isNaN(parseInt(query, 10))) return Number(weight) === parseInt(query, 10);
            return String(first).toLowerCase().startsWith(query)
             || String(path.at(-1)).toLowerCase().startsWith(query);
          })
          .map(([ weight, id, ...path ]) => (
            <div
              className={`${ styles.route } 
            ${ uniqueItemsSet.has(Number(id)) ? styles.routeActive : '' }`}
              key={path.join('')}
            >
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.routeWeight}>{weight}</span>
                  <div className={styles.routeLabel}>

                    <span>{path[0]}</span>
                    <span> - </span>
                    <span>{path.at(-1)}</span>
                    <input
                      type="checkbox"
                      defaultChecked={uniqueItemsSet.has(Number(id))}
                      onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked, id as number)}
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
        <Stats />
      </GraphProvider>
    </div>
  );
};
