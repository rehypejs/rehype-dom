import xtend from 'xtend';
import fromDOM from 'hast-util-from-dom';

export default function parse(options) {
  const settings = xtend(options, this.data('settings'));

  function parser(doc, file) {
    const create = settings.fragment == null || settings.fragment ? createFragment : createDocument;
    return fromDOM(create(String(file)));
  }

  this.Parser = parser;
}

function createFragment(htmlString) {
  const fragment = document.createDocumentFragment();
  const tempEl = document.createElement('body');
  tempEl.innerHTML = htmlString;
  let child = tempEl.firstChild;

  while (child) {
    fragment.appendChild(child);
    child = tempEl.firstChild;
  }

  return fragment;
}

function createDocument(htmlString) {
  return new DOMParser().parseFromString(htmlString, 'text/html');
}
