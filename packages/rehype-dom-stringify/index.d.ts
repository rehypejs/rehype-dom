// This wrapper exists because JS in TS can’t export a `@type` of a function.
import type {Root} from 'hast'
import type {Plugin} from 'unified'
import type {Options} from './lib/index.js'

declare const rehypeDomStrigify: Plugin<[Options?] | void[], Root, string>
export default rehypeDomStrigify

export {Options} from './lib/index.js'
