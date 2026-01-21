import { Byte, pointer } from "./pascal_compat";

export const MaxShortStringLength = 255;

export class ShortString {
  private buffer: StaticArray<Byte>;

  constructor() {
    this.buffer = new StaticArray<Byte>(MaxShortStringLength + 1);
    this.buffer[0] = 0;
  }

  get length(): Byte { return this.buffer[0] }
  set length(value: Byte) { this.buffer[0] = value }

  // 1-based like Pascal
  charAt(index: Byte): Byte {
    return this.buffer[index]
  }

  setFrom(ptr: pointer, len: Byte): void {
    this.length = len;
    memory.copy(changetype<pointer>(this.buffer) + 1, ptr, len)
  }
}
