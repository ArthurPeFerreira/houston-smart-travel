import { createUser } from "@/lib/user/createUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const user = await createUser({
        name: "Startup User",
        user: "user.startup",
        password: "Startup123"
    })

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
        { error: "Failed on Startup" }, 
        { status: 500 }
    );
  }
}


