import { cls, vgaFlush } from "./units/vga";

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

// Everything exported here will be available via WebAssembly instance exports
export { initVideoMem, getSurfacePtr } from "./units/vga";

export {
  initHeap,
  init, afterInit, update, draw
};
