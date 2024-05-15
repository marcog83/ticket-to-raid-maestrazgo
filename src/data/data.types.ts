export type Place = {
  id:number;
  name:string;
  latitude:number;
  longitude:number;
};

export type IConnection = {
  id:number;
  from: number,
  to: number,
  weight:number,
};
