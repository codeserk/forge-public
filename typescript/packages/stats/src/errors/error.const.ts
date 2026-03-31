export const V8_STACK_FRAME_PATTERN = /^\s*at\s+(?:(.+?)\s+\()?(.*?)(?::(\d+))?(?::(\d+))?\)?$/
export const FIREFOX_STACK_FRAME_PATTERN = /^(.*)@(.*?)(?::(\d+))?(?::(\d+))?$/

export const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi
export const HEX_VALUE_PATTERN = /0x[0-9a-f]+/gi
export const NUMBER_PATTERN = /\b\d+\.?\d*\b/g
export const SINGLE_QUOTED_STRING_PATTERN = /'[^']*'/g
export const DOUBLE_QUOTED_STRING_PATTERN = /"[^"]*"/g
