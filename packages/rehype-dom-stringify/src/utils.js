export function serializeNodeToString(node) {
  if (typeof XMLSerializer !== 'undefined') {
    return new XMLSerializer().serializeToString(node);
  }
  if (!node) {
    return '';
  } else if (node.outerHTML != null) {
    return node.outerHTML;
  } else if (node instanceof Document) {
    return `${serializeNodeToString(node.doctype)}${serializeNodeToString(node.documentElement)}`;
  } else if (node instanceof DocumentType) {
    const docTypeAttrs = [
      node.name,
      node.publicId ? 'PUBLIC' : '',
      node.systemId && !node.publicId ? 'SYSTEM' : '',
      node.publicId ? `"${node.publicId}"` : '',
      node.systemId ? `"${node.systemId}"` : '',
    ].filter(v => v).join(' ');
    return `<!DOCTYPE ${docTypeAttrs}>`;
  }
  const el = document.createElement('body');
  el.appendChild(node);
  return el.innerHTML;
}

export function serializeNodeToHtmlString(node) {
  const serialized = serializeNodeToString(node);
  // XMLSerializer puts xmlns on documentElement
  const { namespaceURI } = node.documentElement || node;
  if (namespaceURI) {
    const { namespaceURI: ownerNamespaceURI } = node.ownerDocument
      ? node.ownerDocument.documentElement
      : node.documentElement;
    if (namespaceURI === ownerNamespaceURI) {
      return serialized.replace(` xmlns="${namespaceURI}"`, '');
    }
  }
  return serialized;
}
