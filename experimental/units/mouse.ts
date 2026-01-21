import { SmallInt } from "./pascal_compat";

export const
  MouseButtonNone = 0,
  MouseButtonLeft = 1,
  MouseButtonRight = 2,
  MouseButtonBoth = 3;

let
  mouseX: SmallInt,
  mouseY: SmallInt,
  mouseButton: SmallInt;

// @ts-ignore Hide system cursor
@external("env", "hideCursor")
export declare function hideCursor(): void;

// @ts-ignore Show system cursor
@external("env", "showCursor")
export declare function showCursor(): void;

// @ts-ignore
@external("env", "getMouseX")
export declare function getMouseX(): SmallInt;
// @ts-ignore
@external("env", "getMouseY")
export declare function getMouseY(): SmallInt;
// @ts-ignore
@external("env", "getMouseButton")
export declare function getMouseButton(): SmallInt;

export function updateMouse() {
  mouseX = getMouseX();
  mouseY = getMouseY();
  mouseButton = getMouseButton();
}
