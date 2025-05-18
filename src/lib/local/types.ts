import Decimal from "decimal.js";
import { AirportType } from "../airport/types";

export interface LocalType {
  id: number;
  city: string;
  country: string;
  passagePrice: Decimal;
  image: string;
  active: boolean;
  airport: AirportType;
}

export interface CreateLocalType {
  city: string;
  country: string;
  passagePrice: Decimal;
  image: string;
  airportId: number;
}

export interface CreateLocalTypeFile {
  city: string;
  country: string;
  passagePrice: Decimal;
  image: File;
  airportId: number;
}

export interface EditLocalType {
  airportId: number;
  city: string;
  country: string;
  passagePrice: Decimal;
  active: boolean;
  image: string;  
}

export interface EditLocalTypeFile {
  airportId: number;
  city: string;
  country: string;
  passagePrice: Decimal;
  image: File;
  active: boolean;
}
