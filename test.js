import {JSDOM} from 'jsdom'
import test from 'tape'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import {visit} from 'unist-util-visit'
import {u} from 'unist-builder'
import {h, s} from 'hastscript'
import rehypeDomParse from './packages/rehype-dom-parse/index.js'
import rehypeDomStringify from './packages/rehype-dom-stringify/index.js'
import {rehypeDom} from './packages/rehype-dom/index.js'

const {window} = new JSDOM('')

// The globals needed by `rehype-dom`.
global.XMLSerializer = window.XMLSerializer
global.document = window.document
global.DOMParser = window.DOMParser

test('parse', (t) => {
  t.test('parse', (t) => {
    const processor = unified()
      .use(rehypeDomParse)
      .use(rehypeStringify)
      .freeze()

    t.equal(
      String(
        processor()
          .use(() => (tree) => {
            t.deepEqual(
              tree,
              u('root', [
                h('html', [
                  h('head', [h('title', 'Hi')]),
                  h('body', [h('h2', 'Hello world!')])
                ])
              ])
            )
          })
          .data('settings', {fragment: false})
          .processSync('<title>Hi</title><h2>Hello world!')
      ),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>',
      'should parse a complete document'
    )

    t.equal(
      String(
        processor()
          .use(() => (tree) => {
            t.deepEqual(
              tree,
              u('root', [h('title', 'Hi'), h('h2', 'Hello world!')])
            )
          })
          .processSync('<title>Hi</title><h2>Hello world!')
      ),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should parse a fragment'
    )

    t.equal(
      String(processor().processSync('<p data-test="true">text, <b>hyper')),
      '<p data-test="true">text, <b>hyper</b></p>',
      'should parse data-* attributes correctly'
    )

    t.end()
  })

  t.test('stringify', (t) => {
    const processor = unified()
      .use(rehypeParse)
      .use(rehypeDomStringify)
      .freeze()

    t.equal(
      processor()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>',
      'should stringify a complete document'
    )

    t.equal(
      processor()
        .data('settings', {fragment: true})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should stringify a fragment'
    )

    t.equal(
      processor()
        .data('settings', {fragment: true})
        .processSync('<p data-test="true">text, <b>hyper')
        .toString(),
      '<p data-test="true">text, <b>hyper</b></p>',
      'should stringify data-* attributes correctly'
    )

    t.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(s('#foo.bar', s('circle'))),
      '<g xmlns="http://www.w3.org/2000/svg" id="foo" class="bar"><circle/></g>',
      'should support SVG'
    )

    t.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(
          s('svg', [
            s('foreignObject', [
              h('div', {xmlns: 'http://www.w3.org/1999/xhtml'}, 'Alpha')
            ])
          ])
        ),
      '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><div>Alpha</div></foreignObject></svg>',
      'should support HTML in SVG'
    )

    t.equal(
      processor().stringify(
        h('div', [
          s('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
            s('foreignObject', [
              h('div', {xmlns: 'http://www.w3.org/1999/xhtml'}, 'Alpha')
            ])
          ])
        ])
      ),
      '<div><svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"><foreignObject><div>Alpha</div></foreignObject></svg></div>',
      'should support HTML in SVG in HTML'
    )

    t.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'https://example.com'})
        .stringify(h('example', 'Alpha')),
      '<example xmlns="https://example.com">Alpha</example>',
      'should stringify namespaced elements'
    )

    t.end()
  })

  t.test('rehype-dom', (t) => {
    t.equal(
      rehypeDom()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>',
      'should parse a complete document'
    )

    t.equal(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString(),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should parse a fragment'
    )

    t.equal(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString(),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should parse as a fragment by default'
    )

    t.equal(
      rehypeDom().processSync('<p data-test="true">text, <b>hyper').toString(),
      '<p data-test="true">text, <b>hyper</b></p>',
      'should not mangle data-* attributes'
    )

    t.equal(
      rehypeDom().processSync('<input type="checkbox" checked />').toString(),
      '<input type="checkbox" checked="" />',
      'should support boolean attributes'
    )

    t.equal(
      rehypeDom().processSync('<div class="foo bar">baz</div>').toString(),
      '<div class="foo bar">baz</div>',
      'should not mangle classnames'
    )

    t.equal(
      rehypeDom()
        .processSync(
          `<svg width=230 height=120 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink>
    <circle cx=60 cy=60 r=50 fill=red />
    <circle cx=170 cy=60 r=50 fill=green />
  </svg>`
        )
        .toString(),
      `<svg xmlns="http://www.w3.org/2000/svg" width="230" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <circle cx="60" cy="60" r="50" fill="red"/>
    <circle cx="170" cy="60" r="50" fill="green"/>
  </svg>`,
      'should support svg'
    )

    t.test('plugins', (t) => {
      t.equal(
        rehypeDom()
          .use(() => (tree) => {
            visit(tree, 'text', (node) => {
              node.value = node.value.split('').reverse().join('')
            })
          })
          .processSync('<p>a man a plan a canal panama</p>')
          .toString(),
        '<p>amanap lanac a nalp a nam a</p>',
        'works with a generic plugin'
      )

      t.equal(
        rehypeDom()
          .use(rehypeHighlight)
          .processSync(
            `<h1>Hello World!</h1>
  <pre><code class="language-js">var name = "World";
  console.warn("Hello, " + name + "!")</pre></code>`
          )
          .toString(),
        `<h1>Hello World!</h1>
  <pre><code class="hljs language-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;
  <span class="hljs-variable hljs-language">console</span>.<span class="hljs-title hljs-function">warn</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>`,
        'works with rehype-highlight'
      )

      t.equal(
        rehypeDom()
          .use(rehypeSlug)
          .processSync('<h1>First</h1><h2>Second')
          .toString(),
        '<h1 id="first">First</h1><h2 id="second">Second</h2>',
        'works with rehype-slug'
      )

      t.end()
    })

    t.end()
  })

  t.end()
})
