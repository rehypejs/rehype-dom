/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-to-dom').Options} Options
 */

import {toDom} from 'hast-util-to-dom'
import {webNamespaces} from 'web-namespaces'

const htmlXmlnsExpression = new RegExp(` xmlns="${webNamespaces.html}"`, 'g')

/** @type {import('unified').Plugin<[Options?] | void[], Root, string>} */
export default function stringify(options) {
  const config = /** @type {Options} */ (this.data('settings'))
  const settings = {...options, ...config}

  if (settings.fragment === null || settings.fragment === undefined) {
    settings.fragment = true
  }

  Object.assign(this, {Compiler: compiler})

  /** @type {import('unified').CompilerFunction<Root, string>} */
  function compiler(tree) {
    const node = toDom(tree, settings)
    const serialized = new XMLSerializer().serializeToString(node)

    // XMLSerializer puts xmlns on root elements (typically the document
    // element, but in case of a fragment all of the fragments children).
    // We’re using the DOM, and we focus on HTML, so we can always remove HTML
    // XMLNS attributes (HTML inside SVG does not need to have an XMLNS).
    return serialized.replace(htmlXmlnsExpression, '')
  }
}
