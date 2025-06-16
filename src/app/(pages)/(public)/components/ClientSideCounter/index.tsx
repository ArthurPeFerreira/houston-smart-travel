"use client";

import { useEffect, useRef } from "react";
import { api } from "@/lib/api/api";

export default function ClientSideCounter({
  type,
}: {
  type: "home" | "check flights";
}) {
  const didCount = useRef(false);

  useEffect(() => {
    async function startup() {
      if (didCount.current) return;

      try {
        const response = await api.post("/api/statistic/incrementAccessCount", {
          type,
        });

        if (response.status === 200) {
          didCount.current = true;
        }
      } catch {}
    }

    startup();
  }, []);

  return null;
}
