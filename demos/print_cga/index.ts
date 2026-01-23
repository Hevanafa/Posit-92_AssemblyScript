import { cls, vgaFlush, vgaWidth } from "../../experimental/units/vga";
import { Byte, double, LongInt, SmallInt, Word } from "../../experimental/units/pascal_compat";
import { fitCanvas } from "../../experimental/units/fullscreen";
import { isKeyDown } from "../../experimental/units/keyboard";
import { getMouseX, getMouseY, updateMouse } from "../../experimental/units/mouse";
import { incrementFPS, initFPSCounter } from "../../experimental/units/fps";
import { dt, initDeltaTime, updateDeltaTime } from "../../experimental/units/timing";
import { spr, sprRegion } from "../../experimental/units/img_ref_fast";

import { imgCGA, imgCursor, imgDosuEXE } from "./assets";
import { writeLog, writeLogI32 } from "../../experimental/units/logger";

enum TGameStates {
  GameStateIntro = 1,
  GameStateLoading = 2,
  GameStatePlaying = 3
}

const
  SC_ESC: Byte = 0x01,
  CornflowerBlue = 0xFF6495ED;

// Game state variables
let
  lastEsc = false,
  actualGameState: TGameStates,
  gameTime: double;

// @ts-ignore
@external("env", "signalDone")
export declare function signalDone(): void;
// @ts-ignore
@external("env", "hideCursor")
export declare function hideCursor(): void;
// @ts-ignore
@external("env", "hideLoadingOverlay")
export declare function hideLoadingOverlay(): void;
// @ts-ignore
@external("env", "loadAssets")
export declare function loadAssets(): void;


// function drawFPS(): void {
//   printDefault('FPS:' + i32str(getLastFPS), 240, 0);
// }

function drawMouse(): void {
  spr(imgCursor, getMouseX(), getMouseY())
}


function beginLoadingState(): void {
  actualGameState = TGameStates.GameStateLoading;
  fitCanvas();
  loadAssets()
}

function beginPlayingState(): void {
  hideCursor();
  fitCanvas();

  // Initialise game state here
  writeLog("beginPlayingState");
  actualGameState = TGameStates.GameStatePlaying;
  gameTime = 0.0;
}


let once = false;
function printSimple(text: string, x: SmallInt, y: SmallInt): void {
  let a: Word;
  let charcode: Byte;
  let left: SmallInt = 0;
  let row: SmallInt, col: SmallInt;

  if (!once) {
    writeLog("Charcodes");
    once = true;

    for (a = 0; a < <u16>text.length; a++) {
      charcode = <Byte>text.charCodeAt(a);
      writeLogI32(charcode / 16);
      writeLogI32(charcode % 16);
    }
  }

  for (a = 0; a < <u16>text.length; a++) {
    charcode = <Byte>text.charCodeAt(a);
    row = charcode / 16;
    col = charcode % 16;

    sprRegion(
      imgCGA,
      col * 8, row * 8, 8, 8,
      x + left, y);

    left += 8
  }
}


function init(): void {
  // initHeapMgr();
  initDeltaTime();
  initFPSCounter();
}

function afterInit(): void {
  beginPlayingState();
}

function update(): void {
  updateDeltaTime();
  incrementFPS();

  // Handle inputs
  updateMouse();

  if (lastEsc != isKeyDown(SC_ESC)) {
    lastEsc = isKeyDown(SC_ESC);

    if (lastEsc) {
      // writeLog("ESC is pressed!");
      signalDone();
    }
  }

  // Handle game state updates
  gameTime = gameTime + dt
}

function draw(): void {
  let w: SmallInt;
  let s: string;

  // if (actualGameState == TGameStates.GameStateLoading) {
  //   renderLoadingScreen();
  //   return
  // }

  cls(CornflowerBlue);

  // spr(imgCGA, 10, 10);
  sprRegion(imgCGA, 64, 32, 8, 8, 10, 20);
  sprRegion(imgCGA, 8 * 8, 4 * 8, 8, 8, 10, 30);
  printSimple("Help!", 10, 10);

  // if ((<LongInt>(gameTime * 4) & 1) > 0)
  //   spr(imgDosuEXE[1], 148, 88)
  // else
  //   spr(imgDosuEXE[0], 148, 88);

  // printSimple("Hello world!", 10, 10);

  // s = 'Hello world!';
  // w = measureDefault(s);
  // printDefault(s, (vgaWidth - w) / 2, 120);

  drawMouse();
  // drawFPS();

  vgaFlush()
}

// Everything exported here will be available
// via WebAssembly instance exports

export { setImgCursor, setImgDosuEXE, setImgCga } from "./assets";

export { initVideoMem, getSurfacePtr } from "../../experimental/units/vga";
export { initHeap, WasmGetMem } from "../../experimental/units/wasm_heap";
export { getLogBufferPtr } from "../../experimental/units/logger";
export { registerImageRef } from "../../experimental/units/img_ref";

export {
  beginLoadingState,
  init, afterInit, update, draw
};
