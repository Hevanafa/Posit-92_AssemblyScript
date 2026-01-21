let
  vgaWidth: i16 = 0,
  vgaHeight: i16 = 0,
  bufferSize: i32 = 0,
  surface: usize = 0;

//@ts-ignore
@external("env", "vgaFlush")
export declare function vgaFlush(): void;
//@ts-check

export function initVideoMem(width: i16, height: i16, startAddr: usize): void {
  vgaWidth = width;
  vgaHeight = height;
  surface = startAddr;
  bufferSize = i32(vgaWidth) * i32(vgaHeight) * 4;
  memory.fill(surface, 0, bufferSize);
}

export function getSurfacePtr(): usize {
  return surface;
}

function unsafePset(x: i16, y: i16, colour: u32): void {
  const offset: u32 = (y * vgaWidth + x) * 4;

  // ARGB to RGBA
  store<u8>(surface + offset, u8(colour >> 16 & 0xFF));
  store<u8>(surface + offset + 1, u8(colour >> 8 & 0xFF));
  store<u8>(surface + offset + 2, u8(colour & 0xFF));
  store<u8>(surface + offset + 3, u8(colour >> 24 & 0xFF));
}

export function cls(colour: u32): void {
  for (let b: i16 = 0; b < vgaHeight; b++)
    for (let a: i16 = 0; a < vgaHeight; a++)
      unsafePset(a, b, colour);
}
