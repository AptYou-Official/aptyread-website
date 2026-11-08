"use client";

import { useSyncExternalStore } from "react";

export type DeviceStore = "ios" | "android";

// Static HTML and the first hydration render keep both store choices available.
// No navigation happens during detection; a parent still chooses the link.
const subscribe = () => () => {};
const unknownDevice = () => null;
function deviceStore(): DeviceStore | null {
  const { userAgent, platform, maxTouchPoints } = window.navigator;
  if (/Android/i.test(userAgent)) return "android";
  if (/iPad|iPhone|iPod/i.test(userAgent)) return "ios";
  // iPadOS can request desktop pages and identify itself as a Mac.
  if (platform === "MacIntel" && maxTouchPoints > 1) return "ios";
  return null;
}

export function useDeviceStore(enabled = true): DeviceStore | null {
  return useSyncExternalStore(subscribe, enabled ? deviceStore : unknownDevice, unknownDevice);
}
