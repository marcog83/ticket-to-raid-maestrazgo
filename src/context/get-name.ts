import type { DataItem } from '../data/get-data';

export const getNameBuilder = (data:DataItem[]) => (id) => {
  const name = data.find((place) => place.id === Number(id))?.name ?? id;
  return name;
};
