import { createContext, useContext, useMemo, useState } from 'react';
import { useGraph } from './graph';

const SelectedContext = createContext();

const useSelectedPaths = () => useContext(SelectedContext);

export const SelectedPathsProvider = ({ children }) => {
  const graph = useGraph();
  const [ shortestPaths ] = useState(() => findShortestPaths(graph));
  const initialRoutes = getSavedRoutes(shortestPaths);
  const [ selectedPathsIds, setSelected ] = useState<number[]>(initialRoutes);
  const manager = useMemo(() => {
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

    const selectedPaths = selectedPathsIds
      .map(
        (idSelected) => shortestPaths.find(([ ,id ]) => id === idSelected)?.slice(2),
      );

    return {
      selectedPaths,
      setSelected: handleChange,
    };
  }, [ setSelected, selectedPathsIds, shortestPaths ]);
  return (
    <SelectedContext.Provider value={manager}>
      {children}
    </SelectedContext.Provider>
  );
};
