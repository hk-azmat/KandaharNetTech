"use client";

import { useEffect } from "react";

export default function VisualEditsMessenger() {
  useEffect(() => {
    console.log("%c[VisualEditsMessenger Loaded]", "color: green; font-weight: bold;");

    // Placeholder message listener (safe & empty)
    const handler = (event: MessageEvent) => {
      // دا ځای کې ته وروسته custom logic ورزیادولی شې
      // console.log("Messenger Event:", event.data);
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  return null; // UI نه لري، ځکه دا یوازې messenger/bridge دی
}
