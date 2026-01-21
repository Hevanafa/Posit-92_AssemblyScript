import { cls, vgaFlush } from "../../experimental/units/vga";
import { double } from "../../experimental/units/pascal_compat";

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

// @ts-nocheck
@external("env", "signalDone") export declare function signalDone(): void;
// @ts-check

function beginLoadingState(): void {
  actualGameState = GameStateLoading;
  fitCanvas();
  loadAssets()
}

function beginPlayingState(): void {
  hideCursor();
  fitCanvas();

  // Initialise game state here
  actualGameState = GameStatePlaying;
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

  if (actualGameState == GameStateLoading) {
    renderLoadingScreen();
    return
  }

  cls(CornflowerBlue);

  // TODO: Add the rest of the boilerplate

  vgaFlush()
}

// Everything exported here will be available via WebAssembly instance exports
export { initVideoMem, getSurfacePtr } from "../../experimental/units/vga";
export { initHeap } from "../../experimental/units/wasm_heap";

export {
  beginLoadingState,
  init, afterInit, update, draw
};
