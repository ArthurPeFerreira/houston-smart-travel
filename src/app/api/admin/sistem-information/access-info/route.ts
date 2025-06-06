import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma/prisma"; // ajuste o caminho conforme seu projeto
import { AccessCounter } from "@/lib/accessCounter/types";

export async function GET() {
  try {
    const access: AccessCounter | null =
      await prismaClient.accessCounter.findFirst();

    if (!access) {
      return NextResponse.json(
        { error: "No Access Data Found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(access);
  } catch {
    return NextResponse.json(
      { error: "Failed to Fetch Access Data!" },
      { status: 500 }
    );
  }
}
