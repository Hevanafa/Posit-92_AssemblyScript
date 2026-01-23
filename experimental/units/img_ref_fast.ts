import { PImageRef, getImagePtr } from "./img_ref";
import { Byte, LongInt, LongWord, SmallInt } from "./pascal_compat";
import { unsafePset } from "./vga";

export function spr(imgHandle: LongInt, x: SmallInt, y: SmallInt) {
  let
    image: PImageRef,
    px, py: SmallInt,
    offset: LongWord,
    a: Byte,
    colour: LongWord;

  if (!isImageSet(imgHandle)) return;

  image = getImagePtr(imgHandle);
  // { data := PByte(image^.dataPtr); }

  // { writeLog('offset: ' + i32str(offset)); }

  if (image.allocSize = 0) then
    panicHalt('imgHandle ' + i32str(imgHandle) + ' allocSize is 0!');
  
  // { writeLog('allocSize: ' + i32str(image^.allocSize)); }

  for (py = 0; py < image.height; py++)
  for (px = 0; px < image.width; px++) {
    if ((x + px >= vgaWidth) || (x + px < 0)
      || (y + py >= vgaHeight) || (y + py < 0)) continue;

    // offset to ImageData buffer
    offset = (px + py * image^.width) * 4;

    a = image^.dataPtr[offset + 3];
    if (a < 255) continue;

    colour = unsafeSprPget(image, px, py);
    unsafePset(x + px, y + py, colour)
  }
}