import { AirportType } from "../airport/types";

export interface LocalType {
    id: number; 
    city: string; 
    image: string; 
    active: boolean;
    airport: AirportType;
  }

export interface CreateLocalType {
  city: string; 
  image: string; 
  airportId: number;
}

export interface EditLocalType {
  id: number; 
  city: string; 
  image: string; 
  active: boolean;
  airportId: number;
}