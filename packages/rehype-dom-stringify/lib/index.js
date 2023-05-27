/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-to-dom').Options} Options
 */

import {toDom} from 'hast-util-to-dom'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[(Options | null | undefined)?], Root, string>}
 */
export default function stringify(options) {
  const config = /** @type {Options} */ (this.data('settings'))
  const settings = {...options, ...config}

  if (settings.fragment === null || settings.fragment === undefined) {
    settings.fragment = true
  }

  Object.assign(this, {Compiler: compiler})

  /** @type {import('unified').CompilerFunction<Root, string>} */
  function compiler(tree) {
    return serialize(toDom(tree, settings))
  }
}

/**
 * Serialize DOM nodes.
 *
 * @param {XMLDocument | DocumentFragment | Text | DocumentType | Comment | Element} node
 * @returns {string}
 */
function serialize(node) {
  // Document.
  if ('doctype' in node) {
    const doctype = node.doctype ? serialize(node.doctype) : ''
    const docelem = serialize(node.documentElement)
    return doctype + docelem
  }

  // Doctype.
  if ('publicId' in node) {
    // We don’t support non-HTML doctypes.
    return '<DOCTYPE html>'
  }

  // Element.
  if ('outerHTML' in node) {
    return node.outerHTML
  }

  // Comment, text, fragment.
  if ('textContent' in node) {
    const div = document.createElement('div')
    div.append(node)
    return div.innerHTML
    /* c8 ignore next 4 */
  }

  // ?
  return ''
}
