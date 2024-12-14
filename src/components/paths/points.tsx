import { ChangeEvent, useState } from 'react';
import Papa from 'papaparse';
import { GraphProvider, useGraph } from '../../context/graph';
import { findShortestPaths } from '../../data/find-shortest-paths';
import styles from './points.module.css';
import { Data, DataItem } from '../../data/get-data';
import { Map } from '../map/map';
import { Stats } from './stats';
import { Cards } from './cards/cards';
import { getSavedRoutes } from './get-saved';
import { Entropy } from './entropy';
import { PathsCentrality } from './paths-centrality';

export const Points = () => {
  const graph = useGraph();
  const [ shortestPaths ] = useState(() => findShortestPaths(graph));
  const initialRoutes = getSavedRoutes(shortestPaths);
  const [ selectedPaths, setSelected ] = useState<number[]>(initialRoutes);
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
    const results = shortestPaths.filter(([ ,id ]) => uniqueItemsSet.has(Number(id)));

    const toCopy = results.map(([ weight, id, first, ...path ]) => [ id, weight, first, path.at(-1) ]);
    const csv = Papa.unparse({
      fields: [ 'id', 'weight', 'sourceName', 'destName' ],
      data: toCopy,
    });
    // Copy the text inside the text field
    navigator.clipboard.writeText(csv);

    // Alert the copied text
    // eslint-disable-next-line no-alert
    alert('Copied the text');
  };

  const getGroups = () => {
    const results = shortestPaths.filter(([ ,id ]) => uniqueItemsSet.has(Number(id)));

    const toCopy = results.flatMap(([ , , first, ...path ]) => [ first, path.at(-1) ].sort());

    const _groups = Object.groupBy(toCopy, (name) => name);

    const initialData = Data.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {});

    const groups = Object.entries(_groups).reduce((acc, [ key, values ]) => {
      acc[key] = values.length;
      return acc;
    }, initialData);

    return groups;
  };

  const getSelected = () => {
    const results = shortestPaths.filter(([ ,id ]) => uniqueItemsSet.has(Number(id)));

    const names = results.flatMap(([ , , first, ...path ]) => [ first, path.at(-1) ]);
    const ids = names.map((name) => Data.find((place) => place.name === name)!.id);
    return new Set(ids);
  };
  const [ width, setPanelWidth ] = useState('100%');
  const togglePanel = () => {
    setPanelWidth(width === 400 ? '100%' : 400);
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
            return String(first).toLowerCase().startsWith(query.toLowerCase())
             || String(path.at(-1)).toLowerCase().startsWith(query.toLowerCase());
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
        <div style={{ width, overflow: 'auto' }}>
          <button onClick={togglePanel}>+</button>
          <Cards cards={shortestPaths.filter(([ ,id ]) => uniqueItemsSet.has(Number(id)))} />
          <Stats />
          <Entropy selectedIds={getSelected()} groups={getGroups()} />
          <PathsCentrality paths={shortestPaths.filter(([ ,id ]) => uniqueItemsSet.has(Number(id)))} />
        </div>

      </GraphProvider>
    </div>
  );
};
