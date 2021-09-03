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

/** @type {import('unified').Plugin<[Options?] | void[], string, Root>} */
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

/**
 * @param {string} htmlString
 * @returns {DocumentFragment}
 */
function createFragment(htmlString) {
  const fragment = document.createDocumentFragment()
  const doc = createDocument(htmlString)

  let child

  while ((child = doc.body.firstChild)) {
    fragment.append(child)
  }

  return fragment
}

/**
 * @param {string} htmlString
 * @returns {Document}
 */
function createDocument(htmlString) {
  return new DOMParser().parseFromString(htmlString, 'text/html')
}
