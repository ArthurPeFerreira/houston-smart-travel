import { Prisma } from "../../../prisma/generated";
import { AirportType } from "../airport/types";

export interface RouteType {
  id: number;
  mileageProgram: string;
  active: boolean;
  airports: AirportType[] | null;
  cabins: CabinsType[] | null;
}

export interface CabinsType {
  id: number;
  key: string;
  maximumPoints: number;
  passagePrice: Prisma.Decimal;
  cancellationPrice: Prisma.Decimal;
}

export interface CreateRouteType {
  cabins: {
    key: string;
    maximumPoints: number;
    passagePrice: Prisma.Decimal;
    cancellationPrice: Prisma.Decimal;
  }[];
  airportsId: number[];
  mileageProgram: string;
}

export interface EditRouteType {
  id: number;
  cabins: {
    key: string;
    maximumPoints: number;
    passagePrice: Prisma.Decimal;
    cancellationPrice: Prisma.Decimal;
  }[];
  mileageProgram: string;
  active: boolean;
}
