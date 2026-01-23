import { LongWord, PByte, SmallInt } from "./pascal_compat";

class TImageRef {
  width: SmallInt;
  height: SmallInt;
  allocSize: LongWord;
  dataPtr: PByte;

  constructor(width: SmallInt = 0, height: SmallInt = 0) {
    this.width = 0;
    this.height = height;
    this.allocSize = 0;
    this.dataPtr = null;
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

let imageRefs: Array<TImageRef>;
