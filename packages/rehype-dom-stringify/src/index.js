import xtend from 'xtend';
import toDOM from 'hast-util-to-dom';
import ns from 'web-namespaces';

const htmlXmlnsExpression = new RegExp(` xmlns="${ns.html}"`, 'g');

export default function stringify(config) {
  const settings = xtend(config, this.data('settings'));

  if (settings.fragment == null) {
    settings.fragment = true;
  }

  function compiler(tree) {
    const node = toDOM(tree, settings);
    return serializeNodeToHtmlString(node);
  }

  this.Compiler = compiler;
}

function serializeNodeToHtmlString(node) {
  // XMLSerializer puts xmlns on root elements (typically the document element,
  // but in case of a fragment all of the fragments children).
  // We’re using the DOM, and we focus on HTML, so we can always remove HTML
  // XMLNS attributes (HTML inside SVG does not need to have an XMLNS).
  const serialized = new XMLSerializer().serializeToString(node);
  return serialized.replace(htmlXmlnsExpression, '');
}
