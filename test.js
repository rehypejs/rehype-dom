import assert from 'node:assert/strict'
import test from 'node:test'
import {JSDOM} from 'jsdom'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import {visit} from 'unist-util-visit'
import {u} from 'unist-builder'
import {h, s} from 'hastscript'
import rehypeDomParse from 'rehype-dom-parse'
import rehypeDomStringify from 'rehype-dom-stringify'
import {rehypeDom} from 'rehype-dom'

const {window} = new JSDOM('')

// The globals needed by `rehype-dom`.
global.document = window.document
global.DOMParser = window.DOMParser

test('parse', async (t) => {
  await t.test('parse', () => {
    const processor = unified()
      .use(rehypeDomParse)
      .use(rehypeStringify)
      .freeze()

    assert.equal(
      String(
        processor()
          .use(
            /** @type {import('unified').Plugin<[], import('hast').Root>} */
            () => (tree) => {
              assert.deepEqual(
                tree,
                u('root', [
                  h('html', [
                    h('head', [h('title', 'Hi')]),
                    h('body', [h('h2', 'Hello world!')])
                  ])
                ])
              )
            }
          )
          .data('settings', {fragment: false})
          .processSync('<title>Hi</title><h2>Hello world!')
      ),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>',
      'should parse a complete document'
    )

    assert.equal(
      String(
        processor()
          .use(
            /** @type {import('unified').Plugin<[], import('hast').Root>} */
            () => (tree) => {
              assert.deepEqual(
                tree,
                u('root', [h('title', 'Hi'), h('h2', 'Hello world!')])
              )
            }
          )
          .processSync('<title>Hi</title><h2>Hello world!')
      ),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should parse a fragment'
    )

    assert.equal(
      String(processor().processSync('<p data-test="true">text, <b>hyper')),
      '<p data-test="true">text, <b>hyper</b></p>',
      'should parse data-* attributes correctly'
    )

    assert.equal(
      String(processor().processSync('<!--comment-->')),
      '<!--comment-->',
      'should parse comment correctly'
    )
  })

  await t.test('stringify', () => {
    const processor = unified()
      .use(rehypeParse)
      .use(rehypeDomStringify)
      .freeze()

    assert.equal(
      processor()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>',
      'should stringify a complete document'
    )

    assert.equal(
      processor()
        .data('settings', {fragment: false})
        .processSync('<!doctype html>')
        .toString(),
      '<DOCTYPE html><html><head></head><body></body></html>',
      'should stringify a doctype'
    )

    assert.equal(
      processor().processSync('<!doctype html>').toString(),
      '<DOCTYPE html><html><head></head><body></body></html>',
      'should support empty documents'
    )

    assert.equal(
      processor()
        .data('settings', {fragment: true})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should stringify a fragment'
    )

    assert.equal(
      processor()
        .data('settings', {fragment: true})
        .processSync('<p data-test="true">text, <b>hyper')
        .toString(),
      '<p data-test="true">text, <b>hyper</b></p>',
      'should stringify data-* attributes correctly'
    )

    assert.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(u('root', [s('#foo.bar', s('circle'))])),
      '<g id="foo" class="bar"><circle></circle></g>',
      'should support SVG'
    )

    assert.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(
          u('root', [
            s('svg', [
              s('foreignObject', [
                h('div', {xmlns: 'http://www.w3.org/1999/xhtml'}, 'Alpha')
              ])
            ])
          ])
        ),
      '<svg><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">Alpha</div></foreignObject></svg>',
      'should support HTML in SVG'
    )

    assert.equal(
      processor().stringify(
        u('root', [
          h('div', [
            s('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
              s('foreignObject', [
                h('div', {xmlns: 'http://www.w3.org/1999/xhtml'}, 'Alpha')
              ])
            ])
          ])
        ])
      ),
      '<div><svg xmlns="http://www.w3.org/2000/svg"><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">Alpha</div></foreignObject></svg></div>',
      'should support HTML in SVG in HTML'
    )

    assert.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'https://example.com'})
        .stringify(u('root', [h('example', 'Alpha')])),
      '<example>Alpha</example>',
      'should stringify namespaced elements'
    )
  })

  await t.test('rehype-dom', () => {
    assert.equal(
      rehypeDom()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>',
      'should parse a complete document'
    )

    assert.equal(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString(),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should parse a fragment'
    )

    assert.equal(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString(),
      '<title>Hi</title><h2>Hello world!</h2>',
      'should parse as a fragment by default'
    )

    assert.equal(
      rehypeDom().processSync('<p data-test="true">text, <b>hyper').toString(),
      '<p data-test="true">text, <b>hyper</b></p>',
      'should not mangle data-* attributes'
    )

    assert.equal(
      rehypeDom().processSync('<input type="checkbox" checked />').toString(),
      '<input type="checkbox" checked="">',
      'should support boolean attributes'
    )

    assert.equal(
      rehypeDom().processSync('<div class="foo bar">baz</div>').toString(),
      '<div class="foo bar">baz</div>',
      'should not mangle classnames'
    )

    assert.equal(
      rehypeDom()
        .processSync(
          `<svg width=230 height=120 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink>
    <circle cx=60 cy=60 r=50 fill=red />
    <circle cx=170 cy=60 r=50 fill=green />
  </svg>`
        )
        .toString(),
      `<svg width="230" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <circle cx="60" cy="60" r="50" fill="red"></circle>
    <circle cx="170" cy="60" r="50" fill="green"></circle>
  </svg>`,
      'should support svg'
    )

    assert.equal(
      String(
        rehypeDom().processSync(`<style>
  body > style {
    width: 100px;
  }
</style>`)
      ),
      `<style>
  body > style {
    width: 100px;
  }
</style>`,
      'should process text in `style` correctly'
    )

    assert.equal(
      rehypeDom()
        // @ts-expect-error: to do: remove when `rehype-highlight` is released.
        .use(rehypeHighlight)
        .processSync(
          `<h1>Hello World!</h1>
  <pre><code class="language-js">var name = "World";
  console.warn("Hello, " + name + "!")</pre></code>`
        )
        .toString(),
      `<h1>Hello World!</h1>
  <pre><code class="hljs language-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>`,
      'works with rehype-highlight'
    )

    assert.equal(
      rehypeDom()
        .use(rehypeSlug)
        .processSync('<h1>First</h1><h2>Second')
        .toString(),
      '<h1 id="first">First</h1><h2 id="second">Second</h2>',
      'works with rehype-slug'
    )
  })

  await t.test('plugins', () => {
    assert.equal(
      rehypeDom()
        .use(
          /** @type {import('unified').Plugin<[], import('hast').Root>} */
          () => (tree) => {
            visit(tree, 'text', (node) => {
              node.value = node.value.split('').reverse().join('')
            })
          }
        )
        .processSync('<p>a man a plan a canal panama</p>')
        .toString(),
      '<p>amanap lanac a nalp a nam a</p>',
      'works with a generic plugin'
    )
  })
})
