import { initVideoMem, getSurfacePtr, cls, vgaFlush } from "./units/vga";

/**
 * Compatibility with Pascal
 */
function initHeap(heapStart: u32, heapSize: u32): void {}

function init(): void {

}

function afterInit(): void {

}

function update(): void {}

function draw(): void {
  cls(0xFF6495ED);
  vgaFlush()
}

export {
  initHeap,
  initVideoMem, getSurfacePtr,
  init, afterInit, update, draw
};
