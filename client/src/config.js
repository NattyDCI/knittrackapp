import { Capacitor } from "@capacitor/core";

export const API_BASE = Capacitor.isNativePlatform()
  ? "http://10.0.2.2:3001"
  : "http://localhost:3001";