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


export interface CreateLocalTypeFile {
  city: string; 
  image: File; 
  airportId: number;
}

export interface EditLocalType {
  city: string; 
  image: string; 
  active: boolean;
  airportId: number;
}

export interface EditLocalTypeFile {
  city: string; 
  image: File; 
  active: boolean;
  airportId: number;
}