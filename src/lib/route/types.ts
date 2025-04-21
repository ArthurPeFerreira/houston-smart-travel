import Decimal from "decimal.js";
import { AirportType } from "../airport/types";

export interface RouteType {
  id: number;
  mileageProgram: string;
  enableLayovers: boolean;
  active: boolean;
  airports: AirportType[];
  cabins: CabinsType[];
}

export interface CabinsType {
  id: number;
  key: string;
  maximumPoints: number;
  bagsAmount: number;
  passagePrice: Decimal;
  cancellationPrice: Decimal;
}

export interface CreateRouteType {
  cabins: Omit<CabinsType, "id">[];
  airportsId: number[];
  mileageProgram: string;
  enableLayovers: boolean;
}

export interface EditRouteType {
  id: number;
  cabins: Omit<CabinsType, "id">[];
  mileageProgram: string;
  enableLayovers: boolean;
  active: boolean;
}

export interface RoutesDataType {
  id: number;
  routeId: number;
  originAirport: string;
  destinationAirport: string;
  cabinKey: string;
  date: string; // ou Date se for tratado como objeto Date
  direct: boolean;
  seats: number;
}