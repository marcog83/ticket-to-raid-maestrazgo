export type Place = {
  id:string;
  name:string;
  latitude:number;
  longitude:number;
};

export type IConnection = {
  id:number;
  from: string,
  to: string,
  weight:number,
};
