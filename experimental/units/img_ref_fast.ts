import { PImageRef, getImagePtr, isImageSet, unsafeSprPget } from "./img_ref";
import { Byte, LongInt, LongWord, SmallInt } from "./pascal_compat";
import { unsafePset, vgaHeight, vgaWidth } from "./vga";

export function spr(imgHandle: LongInt, x: SmallInt, y: SmallInt): void {
  let
    image: PImageRef,
    px: SmallInt,
    py: SmallInt,
    offset: LongWord,
    a: Byte,
    colour: LongWord;

  if (!isImageSet(imgHandle)) return;

  image = getImagePtr(imgHandle);

  if (image.allocSize == 0)
    return;
    // panicHalt('imgHandle ' + i32str(imgHandle) + ' allocSize is 0!');
  
  for (py = 0; py < image.height; py++)
  for (px = 0; px < image.width; px++) {
    if ((x + px >= <i16>vgaWidth) || (x + px < 0)
      || (y + py >= <i16>vgaHeight) || (y + py < 0)) continue;

    // offset to ImageData buffer
    offset = (px + py * image.width) * 4;

    a = load<Byte>(image.dataPtr + offset + 3);
    if (a < 255) continue;

    colour = unsafeSprPget(image, px, py);
    unsafePset(x + px, y + py, colour)
  }
}
