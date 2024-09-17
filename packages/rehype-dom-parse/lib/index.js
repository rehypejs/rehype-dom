/**
 * @typedef {import('hast').Root} Root
 *
 * @typedef {import('unified').Parser<Root>} Parser
 *
 * @typedef {import('../index.js').Options} Options
 */

import {fromDom} from 'hast-util-from-dom'

/**
 * Add support for parsing from HTML with DOM APIs.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function parse(options) {
  /** @type {import('unified').Processor<Root>} */
  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.
  const self = this
  const settings = {...self.data('settings'), ...options}

  self.parser = parser

  /** @type {Parser} */
  function parser(value) {
    const create = settings.fragment === false ? createDocument : createFragment
    // Assume document/fragment in -> root out.
    return /** @type {Root} */ (fromDom(create(value)))
  }
}

/**
 * Create a fragment.
 *
 * @param {string} value
 *   HTML.
 * @returns {DocumentFragment}
 *   Document fragment.
 */
function createFragment(value) {
  const node = createDocument('<!doctype html><body>' + value)

  /**
   * Pretend as a DocumentFragment node, which is fine for `fromDom`.
   */
  return /** @type {DocumentFragment} */ ({
    nodeType: 11,
    childNodes: node.body.childNodes
  })
}

/**
 * Create a document.
 *
 * @param {string} value
 *   HTML.
 * @returns {Document}
 *   Document.
 */
function createDocument(value) {
  return new DOMParser().parseFromString(value, 'text/html')
}
