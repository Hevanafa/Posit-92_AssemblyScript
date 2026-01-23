import { LongInt, SmallInt } from "../../experimental/units/pascal_compat";

export let
  imgCursor: LongInt,
  imgDosuEXE = new StaticArray<LongInt>(2);

export function setImgCursor(imgHandle: LongInt): void {
  imgCursor = imgHandle
}

export function setImgDosuEXE(imgHandle: LongInt, idx: SmallInt): void {
  imgDosuEXE[idx] = imgHandle
}
