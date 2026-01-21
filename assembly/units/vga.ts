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
