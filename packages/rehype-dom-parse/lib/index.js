/**
 * @typedef {import('hast').Root} Root
 *
 * @typedef Options
 *   Configuration.
 * @property {boolean} [fragment=true]
 *   Specify whether to parse a fragment, instead of a complete document.
 *   In document mode, unopened `html`, `head`, and `body` elements are opened
 *   in just the right places.
 */

import {fromDom} from 'hast-util-from-dom'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[(Options | null | undefined)?], string, Root>}
 */
export default function parse(options) {
  const settings = /** @type {Options} */ (this.data('settings'))
  const {fragment} = {...options, ...settings}

  Object.assign(this, {Parser: parser})

  /** @type {import('unified').ParserFunction<Root>} */
  function parser(doc) {
    const create =
      fragment === null || fragment === undefined || fragment
        ? createFragment
        : createDocument
    return /** @type {Root} */ (fromDom(create(doc)))
  }
}

const DOCUMENT_FRAGMENT_NODE = 11

/**
 * @param {string} htmlString
 * @returns {DocumentFragment}
 */
function createFragment(htmlString) {
  const doc = createDocument('<!doctype html><body>' + htmlString)

  /**
   * Pretend as a DocumentFragment node,
   * @see https://github.com/rehypejs/rehype-dom/pull/19 for more details
   */
  return /** @type {DocumentFragment} */ ({
    nodeType: DOCUMENT_FRAGMENT_NODE,
    childNodes: doc.body.childNodes
  })
}

/**
 * @param {string} htmlString
 * @returns {Document}
 */
function createDocument(htmlString) {
  return new DOMParser().parseFromString(htmlString, 'text/html')
}
