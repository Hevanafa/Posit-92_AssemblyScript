import { LongInt, pointer, SmallInt } from "../../experimental/units/pascal_compat";
import { TBMFont, TBMFontGlyph } from "../../experimental/units/bmfont";

export let
  imgCursor: LongInt,
  imgCGA: LongInt,
  imgDosuEXE = new StaticArray<LongInt>(2),
  
  defaultFont: TBMFont,
  defaultFontGlyphs: StaticArray<TBMFontGlyph>;

export function setImgCursor(imgHandle: LongInt): void {
  imgCursor = imgHandle
}

export function setImgDosuEXE(imgHandle: LongInt, idx: SmallInt): void {
  imgDosuEXE[idx] = imgHandle
}

export function setImgCga(imgHandle: LongInt): void {
  imgCGA = imgHandle
}

export function defaultFontPtr(): pointer {
  return changetype<pointer>(defaultFont)
}

export function defaultFontGlyphsPtr(): pointer {
  return changetype<pointer>(defaultFontGlyphs)
}

// Initialisation
defaultFont = new TBMFont();
defaultFontGlyphs = new StaticArray<TBMFontGlyph>(127);
