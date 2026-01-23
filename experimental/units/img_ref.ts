import { LongInt, LongWord, PByte, SmallInt } from "./pascal_compat";

class TImageRef {
  width: SmallInt;
  height: SmallInt;
  allocSize: LongWord;
  dataPtr: PByte;

  constructor(width: SmallInt = 0, height: SmallInt = 0) {
    this.width = width;
    this.height = height;
    this.allocSize = 0;
    this.dataPtr = 0;
  }
}

// TImageRef is already a reference type
export type PImageRef = TImageRef;

export enum SprFlips {
  SprFlipNone = 0,
  SprFlipHorizontal = 1,
  SprFlipVertical = 2,
  SprFlipBoth = SprFlipHorizontal | SprFlipVertical
}

const MaxImageRefs = 256;

// Index 0 is unused
const imageRefs = new StaticArray<TImageRef>(MaxImageRefs + 1);

function findEmptyImageRefSlot(): SmallInt {
  let a: LongInt;

  for (a = 1; a <= MaxImageRefs; a++)
    if (!isImageSet(a))
      return a;

  return -1
}

export function registerImageRef(imgHandle: LongInt, dataPtr: PByte, w: SmallInt, h: SmallInt): void {
  const idx = findEmptyImageRefSlot();

  if (idx < 0) panicHalt("Image ref pool is full!");

  imageRefs[imgHandle].width = w;
  imageRefs[imgHandle].height = h;
  imageRefs[imgHandle].allocSize = <LongWord>w * h * 4;
  imageRefs[imgHandle].dataPtr = dataPtr;
}

export function getImagePtr(imgHandle: LongInt): PImageRef {
  return imageRefs[imgHandle]
}

export function isImageSet(imgHandle: LongInt): bool {
  if (imgHandle <= 0) return false;

  return imageRefs[imgHandle].allocSize > 0
}


// Initialisation
for (let a=0; a<=MaxImageRefs; a++)
  imageRefs[a] = new TImageRef();

