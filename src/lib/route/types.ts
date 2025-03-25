import { Prisma } from "../../../prisma/generated";
import { AirportType } from "../airport/types";

export interface RouteType {
  id: number;
  hasCabinY: boolean;
  hasCabinW: boolean;
  hasCabinJ: boolean;
  hasCabinF: boolean;
  mileageProgram: string;
  maximumPoints: number;
  passagePrice: Prisma.Decimal;
  active: boolean;
  airports: AirportType[] | null;
}

export interface CreateRouteType {
  hasCabinY: boolean;
  hasCabinW: boolean;
  hasCabinJ: boolean;
  hasCabinF: boolean;
  mileageProgram: string;
  maximumPoints: number;
  passagePrice: Prisma.Decimal;
  airportsId: number[];
}

export interface EditRouteType {
  id: number;
  hasCabinY: boolean;
  hasCabinW: boolean;
  hasCabinJ: boolean;
  hasCabinF: boolean;
  mileageProgram: string;
  maximumPoints: number;
  passagePrice: Prisma.Decimal;
}