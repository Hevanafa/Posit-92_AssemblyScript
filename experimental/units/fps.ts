import { double, SmallInt } from "./pascal_compat";
import { getTimer } from "./timing";

let
  actualFPS: SmallInt,
  lastFPS: SmallInt,
  lastFPSTime: double; // in seconds

export function initFPSCounter(): void {
  actualFPS = 0;
  lastFPS = 0;
  lastFPSTime = getTimer();
}

export function incrementFPS(): void {
  actualFPS = actualFPS + 1;

  if (getTimer() - lastFPSTime >= 1.0) {
    lastFPSTime = getTimer();
    lastFPS = actualFPS;
    actualFPS = 1
  }
}

export function getLastFPS(): SmallInt {
  return lastFPS
}
