import { LongInt, LongWord, PByte, SmallInt } from "./pascal_compat";

class TImageRef {
  width: SmallInt;
  height: SmallInt;
  allocSize: LongWord;
  dataPtr: PByte;

  constructor(width: SmallInt = 0, height: SmallInt = 0) {
    this.width = 0;
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

export function registerImageRef(imgHandle: LongInt, dataPtr: PByte, w: SmallInt, h: SmallInt): void {
  const idx = findEmptyImageRefSlot();

  if (idx < 0) panicHalt("Image ref pool is full!");

  imageRefs[imgHandle].width = w;
  imageRefs[imgHandle].height = h;
  imageRefs[imgHandle].allocSize = <LongWord>w * h * 4;
  imageRefs[imgHandle].dataPtr = dataPtr;
}


// Initialisation
for (let a=0; a<=MaxImageRefs; a++)
  imageRefs[a] = new TImageRef();

