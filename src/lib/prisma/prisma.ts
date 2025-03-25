import { PrismaClient } from "../../../prisma/generated";

export const prismaClient = new PrismaClient();

const aba = await prismaClient.route.findMany({
  select: {
    hasCabinY: true,
    hasCabinW: true,
    hasCabinJ: true,
    hasCabinF: true,
    mileageProgram: true,
    maximumPoints: true,
    active: true,
    airports: { select: { airport: true } },
  },
});

const aba2 = await prismaClient.airports.findMany({
  select: {
    id: true,
    city: true,
    local: true,
    routes: {
      select: {
        route: {
          select: {
            id: true,
            hasCabinY: true,
            hasCabinW: true,
            hasCabinJ: true,
            hasCabinF: true,
            active: true,
            maximumPoints: true,
            mileageProgram: true,
            airports: {
              select: {
                airport: {
                  select: { id: true, city: true, airportCode: true },
                },
              },
            },
          },
        },
      },
    },
  },
});
