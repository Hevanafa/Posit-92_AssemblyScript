import { double } from "./pascal_compat";

export let
  dt: double,
  lastFrameTime: double,
  currentTime: double;

// @ts-ignore
@external("env", "getTimer")
export declare function getTimer(): double;
// @ts-ignore
@external("env", "getFullTimer")
export declare function getFullTimer(): double;

export function initDeltaTime() {
  dt = 0.0;
  lastFrameTime = getTimer();
  currentTime = lastFrameTime
}

export function updateDeltaTime() {
  currentTime = getTimer();
  dt = currentTime - lastFrameTime;
  lastFrameTime = currentTime
}
