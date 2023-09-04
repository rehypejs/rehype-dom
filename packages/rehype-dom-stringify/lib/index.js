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

  /** @type {import('unified').Compiler<Root, string>} */
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

  // Comment, element, fragment, text.
  const template = document.createElement('template')
  template.content.append(node)
  return template.innerHTML
}
