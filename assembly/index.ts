import { cls, vgaFlush } from "./units/vga";

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
  init, afterInit, update, draw
};
