import { Byte, LongWord, PByteArray, pointer, SmallInt, Word } from "./pascal_compat";

let
  vgaWidth: Word = 0,
  vgaHeight: Word = 0,
  bufferSize: LongWord = 0,
  surface: PByteArray = 0;

//@ts-ignore
@external("env", "vgaFlush")
export declare function vgaFlush(): void;
//@ts-check

export function initVideoMem(width: Word, height: Word, startAddr: pointer): void {
  vgaWidth = width;
  vgaHeight = height;
  surface = startAddr;
  bufferSize = <LongWord>vgaWidth * vgaHeight * 4;
  memory.fill(surface, 0, bufferSize);
}

export function getSurfacePtr(): pointer {
  return surface;
}

function unsafePset(x: SmallInt, y: SmallInt, colour: LongWord): void {
  const offset = (<LongWord>y * vgaWidth + x) * 4;

  // ARGB to RGBA
  store<Byte>(surface + offset, <Byte>(colour >> 16 & 0xFF));
  store<Byte>(surface + offset + 1, <Byte>(colour >> 8 & 0xFF));
  store<Byte>(surface + offset + 2, <Byte>(colour & 0xFF));
  store<Byte>(surface + offset + 3, <Byte>(colour >> 24 & 0xFF));
}

export function cls(colour: LongWord): void {
  for (let b: Word = 0; b < vgaHeight; b++)
    for (let a: Word = 0; a < vgaWidth; a++)
      unsafePset(a, b, colour);
}
