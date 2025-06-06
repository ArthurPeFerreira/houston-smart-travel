/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
  const globalKey = "__hst_task_scheduled__";
  const isScheduled = Boolean((globalThis as any)[globalKey]);

  return NextResponse.json({
    scheduled: isScheduled,
    message: isScheduled
      ? "Fetching Seats task is already scheduled."
      : "Fetching Seats task is NOT scheduled yet.",
  });
}
