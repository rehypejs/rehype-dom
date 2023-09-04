/// <reference types="rehype-dom-parse" />
/// <reference types="rehype-dom-stringify" />

import type {Root} from 'hast'
import type {Processor} from 'unified'

/**
 * Create a new unified processor that already uses `rehype-dom-parse` and
 * `rehype-dom-stringify`.
 */
export const rehypeDom: Processor<Root, undefined, undefined, Root, string>
