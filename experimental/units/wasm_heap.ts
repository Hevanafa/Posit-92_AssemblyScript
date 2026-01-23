import { LongWord, pointer } from "./pascal_compat";

/**
 * For compatibility with Pascal
 */
export function initHeap(heapStart: u32, heapSize: u32): void {}

export function WasmGetMem(bytes: LongWord): pointer {
  return __new(bytes, 0)
}
