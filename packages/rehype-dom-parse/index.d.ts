// This wrapper exists because JS in TS can’t export a `@type` of a function.
import type {Root} from 'hast'
import type {Plugin} from 'unified'
import type {Options} from './lib/index.js'

declare const rehypeDomParse: Plugin<
  // eslint-disable-next-line @typescript-eslint/ban-types
  [(Options | null | undefined)?],
  string,
  Root
>
export default rehypeDomParse

export type {Options} from './lib/index.js'
