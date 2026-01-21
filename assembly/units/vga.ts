let
  vgaWidth: i16 = 0,
  vgaHeight: i16 = 0,
  bufferSize: i32 = 0,
  surface: usize = 0;

export function initVideoMem(width: i16, height: i16, startAddr: usize) {
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
  surface[offset] = colour >> 16 & 0xFF;
  surface[offset + 1] = colour >> 8 & 0xFF;
  surface[offset + 2] = colour & 0xFF;
  surface[offset + 3] = colour >> 24 & 0xFF;
}

export function cls(colour: u32) {
  for (let b = 0; b < vgaHeight; b++)
    for (let a = 0; a < vgaHeight; a++)
      unsafePset(a, b, colour);
}
