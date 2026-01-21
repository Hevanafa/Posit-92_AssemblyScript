import { cls, vgaFlush, vgaWidth } from "../../experimental/units/vga";
import { double, LongInt } from "../../experimental/units/pascal_compat";
import { fitCanvas } from "../../experimental/units/fullscreen";
import { isKeyDown } from "../../experimental/units/keyboard";

enum TGameStates {
  GameStateIntro = 1,
  GameStateLoading = 2,
  GameStatePlaying = 3
}

const
  SC_ESC = 0x01,
  CornflowerBlue = 0xFF6495ED;

// Game state variables
let
  lastEsc = false,
  actualGameState: TGameStates,
  gameTime: double;

// @ts-ignore
@external("env", "signalDone")
export declare function signalDone(): void;
@external("env", "hideCursor")
export declare function hideCursor(): void;
@external("env", "loadAssets")
export declare function loadAssets(): void;

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

  if (lastEsc <> isKeyDown(SC_ESC)) {
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

  if (actualGameState == TGameStates.GameStateLoading) {
    renderLoadingScreen();
    return
  }

  cls(CornflowerBlue);

  if ((<LongInt>(gameTime * 4) & 1) > 0)
    spr(imgDosuEXE[1], 148, 88)
  else
    spr(imgDosuEXE[0], 148, 88);

  s = 'Hello world!';
  w = measureDefault(s);
  printDefault(s, (vgaWidth - w) / 2, 120);

  drawMouse;
  drawFPS;

  vgaFlush()
}

// Everything exported here will be available via WebAssembly instance exports
export { initVideoMem, getSurfacePtr } from "../../experimental/units/vga";
export { initHeap } from "../../experimental/units/wasm_heap";

export {
  beginLoadingState,
  init, afterInit, update, draw
};
