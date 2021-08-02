import fromDOM from 'hast-util-from-dom'

export default function parse(options) {
  const settings = {...options, ...this.data('settings')}

  function parser(doc, file) {
    const create =
      settings.fragment == null || settings.fragment
        ? createFragment
        : createDocument
    return fromDOM(create(String(file)))
  }

  this.Parser = parser
}

function createFragment(htmlString) {
  const fragment = document.createDocumentFragment()
  const temporary = document.createElement('body')
  temporary.innerHTML = htmlString
  let child = temporary.firstChild

  while (child) {
    fragment.appendChild(child)
    child = temporary.firstChild
  }

  return fragment
}

function createDocument(htmlString) {
  return new DOMParser().parseFromString(htmlString, 'text/html')
}
