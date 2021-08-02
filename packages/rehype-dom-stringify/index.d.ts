// This wrapper exists because JS in TS can’t export a `@type` of a function.
import type {Options} from './lib/index.js'
import type {Root} from 'hast'
import type {Plugin} from 'unified'
declare const rehypeDomStrigify: Plugin<[Options?] | void[], Root, string>
export default rehypeDomStrigify
export type {Options}
