import { Byte, LongInt, SmallInt, Word } from "./pascal_compat";

export class TBMFontGlyph {
  id: Word;
  x: Word;
  y: Word;
  width: Word;
  height: Word;
  xoffset: SmallInt;
  yoffset: SmallInt;
  xadvance: SmallInt;

  constructor() {
    this.id = 0;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.xoffset = 0;
    this.yoffset = 0;
    this.xadvance = 0;
  }
}

export class TBMFont {
  face: StaticArray<Byte>;
  filename: StaticArray<Byte>;
  lineHeight: Word;
  imgHandle: LongInt;

  constructor() {
    this.face = new StaticArray<Byte>(16);
    this.filename = new StaticArray<Byte>(64);
    this.lineHeight = 0;
    this.imgHandle = 0;
  }
}
