
import { redis } from "@/lib/redis/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    


    return NextResponse.json(await redis.ping());
  } catch {
    return NextResponse.json(
        { error: "Failed on Startup" }, 
        { status: 500 }
    );
  }
}


