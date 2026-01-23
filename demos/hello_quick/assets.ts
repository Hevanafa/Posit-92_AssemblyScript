import { LongInt } from "../../experimental/units/pascal_compat";

export let
  imgCursor: LongInt;

export function setImgCursor(imgHandle: LongInt): void {
  imgCursor = imgHandle
}
