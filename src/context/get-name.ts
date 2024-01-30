import { Data } from '../data/get-data';

export const getName = (id:string) => {
  const name = Data.find((place) => place.id === Number(id))?.name ?? id;
  return name;
};
