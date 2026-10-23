"use client";

import { useEffect } from "react";
import { startHomeMotion } from "./motion";

/** Starts the homepage motion on the nearest .hm root. Renders nothing. */
export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hm");
    return root ? startHomeMotion(root) : undefined;
  }, []);
  return null;
}
