// app/api/access-count/route.ts
import { queueHst } from "@/lib/bullmq/bullmq";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Filtra bots/crawlers pelo User-Agent
  const ua = request.headers.get("user-agent") || "";
  if (/bot|crawler|spider|bing|google/i.test(ua)) {
    // retorna 204 (No Content) sem enfileirar nada
    return new NextResponse(null, { status: 204 });
  }

  try {
    // Parseia o JSON e valida o campo `type`
    const body = await request.json();
    const { type }: { type?: "check flights" | "home" } = body;
    if (!type) {
      return NextResponse.json(
        { error: "Missing field in body: type" },
        { status: 400 }
      );
    }

    // Define o jobName conforme o tipo
    let jobName: string;
    switch (type) {
      case "check flights":
        jobName = "incrementCheckFlightsAccessCount";
        break;
      case "home":
        jobName = "incrementHomeAccessCount";
        break;
      default:
        return NextResponse.json(
          { error: `Invalid type: ${type}` },
          { status: 400 }
        );
    }

    // Enfileira a tarefa no BullMQ
    await queueHst.add(jobName, {
      priority: 0,
      delay: 0,
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: false,
      stackTraceLimit: 5,
    });

    // 5) Responde OK
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to increment access count:", error);
    return NextResponse.json(
      { error: "Failed to increment access count." },
      { status: 500 }
    );
  }
}
