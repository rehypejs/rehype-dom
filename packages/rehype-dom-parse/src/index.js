import xtend from 'xtend';
import fromDOM from 'hast-util-from-dom';

function createFragmentFromHtml(htmlString) {
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

function createDocumentFromHtml(htmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, 'text/html');
}

export default function parse(options) {
  const settings = xtend(options, this.data('settings'));

  function parser(doc, file) {
    const createTreeFromHtml = settings.fragment == null || settings.fragment
      ? createFragmentFromHtml
      : createDocumentFromHtml;
    return fromDOM(createTreeFromHtml(String(file)));
  }

  this.Parser = parser;
}
