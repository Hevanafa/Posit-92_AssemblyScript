import { cls, vgaFlush } from "../../experimental/units/vga";

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
export { initVideoMem, getSurfacePtr } from "../../experimental/units/vga";
export { initHeap } from "../../experimental/units/wasm_heap";

export {
  init, afterInit, update, draw
};
