import { Byte } from "./pascal_compat";

// @ts-ignore
@external("env", "isKeyDown")
export declare function isKeyDown(scancode: Byte): boolean;
