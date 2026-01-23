import { Byte, LongInt, pointer, Word } from "./pascal_compat";

const LogBufferSize = 256;
const logBuffer = memory.data<Byte>(LogBufferSize);

// @ts-ignore
@external("env", "writeLogI32")
export declare function writeLogI32(value: LongInt): void;

// @ts-ignore
@external("env", "flushLog")
declare function flushLog(): void;

export function writeLog(msg: string) {
  let a: Byte;
  let len = <Word>msg.length;

  // Cap length to 255
  if (len > 255) len = 255;

  // logBuffer[0] is implicit here
  store<Byte>(logBuffer, <Byte>len);
  for (a = 0; a <= len; a++)
    store<Byte>(logBuffer + 1 + a, msg.charCodeAt(a));

  // JS will read logBuffer
  flushLog()
}

export function getLogBufferPtr(): pointer {
  return logBuffer
}