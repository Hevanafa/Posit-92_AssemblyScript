import { Byte, double, LongInt, SmallInt, Word } from "../../experimental/units/pascal_compat";

import { i32str } from "../../experimental/units/conv";
import { cls, vgaFlush, vgaWidth } from "../../experimental/units/vga";
import { fitCanvas } from "../../experimental/units/fullscreen";
import { isKeyDown } from "../../experimental/units/keyboard";
import { getMouseX, getMouseY, updateMouse } from "../../experimental/units/mouse";
import { getLastFPS, incrementFPS, initFPSCounter } from "../../experimental/units/fps";
import { dt, initDeltaTime, updateDeltaTime } from "../../experimental/units/timing";
import { spr, sprRegion } from "../../experimental/units/img_ref_fast";

import { imgCGA, imgCursor, imgDosuEXE } from "./assets";

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


function drawFPS(): void {
  printSimple("FPS:" + i32str(getLastFPS()), 240, 0);
}

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
  actualGameState = TGameStates.GameStatePlaying;
  gameTime = 0.0;
}


function printSimple(text: string, x: SmallInt, y: SmallInt): void {
  let a: Word;
  let charcode: Byte;
  let left: SmallInt = 0;
  let row: SmallInt, col: SmallInt;

  for (a = 0; a < <u16>text.length; a++) {
    charcode = <Byte>text.charCodeAt(a);
    row = charcode / 16;
    col = charcode % 16;

    sprRegion(imgCGA,
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
  // if (actualGameState == TGameStates.GameStateLoading) {
  //   renderLoadingScreen();
  //   return
  // }

  cls(CornflowerBlue);

  if ((<LongInt>(gameTime * 4) & 1) > 0)
    spr(imgDosuEXE[1], 148, 88)
  else
    spr(imgDosuEXE[0], 148, 88);

  printSimple("Hello world!", (vgaWidth - 96) / 2, 120);

  drawMouse();
  drawFPS();

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
