import Decimal from "decimal.js";
import { AirportType } from "../airport/types";
import { CabinKey } from "./cabins";

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
  passagePriceFromAirport1To2: Decimal;
  passagePriceFromAirport2To1: Decimal;
  passagePriceRoundTrip: Decimal;
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
  cabinKey: CabinKey;
  date: string;
  direct: boolean;
  seats: number;
}

export interface RouteModel {
  ID: string;
  OriginAirport: string;
  OriginRegion: string;
  DestinationAirport: string;
  DestinationRegion: string;
  NumDaysOut: number;
  Distance: number;
  Source: string;
}

export interface AvailabilityModel {
  ID: string;
  RouteID: string;
  Route: RouteModel;
  Date: string;
  ParsedDate: string;

  YAvailable: boolean;
  WAvailable: boolean;
  JAvailable: boolean;
  FAvailable: boolean;

  YAvailableRaw: boolean;
  WAvailableRaw: boolean;
  JAvailableRaw: boolean;
  FAvailableRaw: boolean;

  YMileageCost: number;
  WMileageCost: number;
  JMileageCost: number;
  FMileageCost: number;

  YMileageCostRaw: number;
  WMileageCostRaw: number;
  JMileageCostRaw: number;
  FMileageCostRaw: number;

  YDirectMileageCost: number;
  WDirectMileageCost: number;
  JDirectMileageCost: number;
  FDirectMileageCost: number;

  YDirectMileageCostRaw: number;
  WDirectMileageCostRaw: number;
  JDirectMileageCostRaw: number;
  FDirectMileageCostRaw: number;

  TaxesCurrency: string;
  YTotalTaxes: number;
  WTotalTaxes: number;
  JTotalTaxes: number;
  FTotalTaxes: number;

  YTotalTaxesRaw: number;
  WTotalTaxesRaw: number;
  JTotalTaxesRaw: number;
  FTotalTaxesRaw: number;

  YDirectTotalTaxes: number;
  WDirectTotalTaxes: number;
  JDirectTotalTaxes: number;
  FDirectTotalTaxes: number;

  YDirectTotalTaxesRaw: number;
  WDirectTotalTaxesRaw: number;
  JDirectTotalTaxesRaw: number;
  FDirectTotalTaxesRaw: number;

  YRemainingSeats: number;
  WRemainingSeats: number;
  JRemainingSeats: number;
  FRemainingSeats: number;

  YRemainingSeatsRaw: number;
  WRemainingSeatsRaw: number;
  JRemainingSeatsRaw: number;
  FRemainingSeatsRaw: number;

  YDirectRemainingSeats: number;
  WDirectRemainingSeats: number;
  JDirectRemainingSeats: number;
  FDirectRemainingSeats: number;

  YDirectRemainingSeatsRaw: number;
  WDirectRemainingSeatsRaw: number;
  JDirectRemainingSeatsRaw: number;
  FDirectRemainingSeatsRaw: number;

  YAirlines: string;
  WAirlines: string;
  JAirlines: string;
  FAirlines: string;

  YAirlinesRaw: string;
  WAirlinesRaw: string;
  JAirlinesRaw: string;
  FAirlinesRaw: string;

  YDirectAirlines: string;
  WDirectAirlines: string;
  JDirectAirlines: string;
  FDirectAirlines: string;

  YDirectAirlinesRaw: string;
  WDirectAirlinesRaw: string;
  JDirectAirlinesRaw: string;
  FDirectAirlinesRaw: string;

  YDirect: boolean;
  WDirect: boolean;
  JDirect: boolean;
  FDirect: boolean;

  YDirectRaw: boolean;
  WDirectRaw: boolean;
  JDirectRaw: boolean;
  FDirectRaw: boolean;

  Source: string;
  CreatedAt: string;
  UpdatedAt: string;
  AvailabilityTrips?: string | null;
}

export interface AvailabilityResponse {
  data: AvailabilityModel[];
  count: number;
  hasMore: boolean;
  moreURL?: string;
  cursor: number;
}

export interface FlightsAvailability {
  routeId: number;
  cabinKey: CabinKey;
  date: Date;
  direct: boolean;
  seats: number;
  originAirport: string;
  destinationAirport: string;
}

export interface UpdateSeatsAvailabilityType {
  route: RouteType;
  startDate: string;
  endDate: string;
}
