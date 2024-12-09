/**
 * @import {Root} from 'hast'
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {h, s} from 'hastscript'
import {JSDOM} from 'jsdom'
import {rehypeDom} from 'rehype-dom'
import rehypeDomParse from 'rehype-dom-parse'
import rehypeDomStringify from 'rehype-dom-stringify'
import rehypeStarryNight from 'rehype-starry-night'
import rehypeParse from 'rehype-parse'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
import {u} from 'unist-builder'
import {visit} from 'unist-util-visit'

const {window} = new JSDOM('')

// The globals needed by `rehype-dom`.
globalThis.DOMParser = window.DOMParser
globalThis.document = window.document

test('rehype-dom-parse', async function (t) {
  const processor = unified().use(rehypeDomParse).use(rehypeStringify).freeze()

  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('rehype-dom-parse')).sort(), [
      'default'
    ])
  })

  await t.test('should parse a complete document', async function () {
    assert.equal(
      String(
        processor()
          .use(function () {
            return function (tree) {
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
          })
          .data('settings', {fragment: false})
          .processSync('<title>Hi</title><h2>Hello world!')
      ),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>'
    )
  })

  await t.test('should parse a fragment', async function () {
    assert.equal(
      String(
        processor()
          .use(function () {
            return function (tree) {
              assert.deepEqual(
                tree,
                u('root', [h('title', 'Hi'), h('h2', 'Hello world!')])
              )
            }
          })
          .processSync('<title>Hi</title><h2>Hello world!')
      ),
      '<title>Hi</title><h2>Hello world!</h2>'
    )
  })

  await t.test('should parse dataset correctly', async function () {
    assert.equal(
      String(processor().processSync('<p data-test="true">text, <b>hyper')),
      '<p data-test="true">text, <b>hyper</b></p>'
    )
  })

  await t.test('should parse comment correctly', async function () {
    assert.equal(
      String(processor().processSync('<!--comment-->')),
      '<!--comment-->'
    )
  })
})

test('rehype-dom-stringify', async function (t) {
  const processor = unified().use(rehypeParse).use(rehypeDomStringify).freeze()

  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('rehype-dom-stringify')).sort(), [
      'default'
    ])
  })

  await t.test('should stringify a complete document', async function () {
    assert.equal(
      processor()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>'
    )
  })

  await t.test('should stringify a doctype', async function () {
    assert.equal(
      processor()
        .data('settings', {fragment: false})
        .processSync('<!doctype html>')
        .toString(),
      '<DOCTYPE html><html><head></head><body></body></html>'
    )
  })

  await t.test('should support empty documents', async function () {
    assert.equal(
      processor().processSync('<!doctype html>').toString(),
      '<DOCTYPE html><html><head></head><body></body></html>'
    )
  })

  await t.test('should support empty fragment', async function () {
    assert.equal(
      processor().data('settings', {fragment: true}).processSync('').toString(),
      ''
    )
  })

  await t.test('should stringify a fragment', async function () {
    assert.equal(
      processor()
        .data('settings', {fragment: true})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<title>Hi</title><h2>Hello world!</h2>'
    )
  })

  await t.test(
    'should stringify dataset attributes correctly',
    async function () {
      assert.equal(
        processor()
          .data('settings', {fragment: true})
          .processSync('<p data-test="true">text, <b>hyper')
          .toString(),
        '<p data-test="true">text, <b>hyper</b></p>'
      )
    }
  )

  await t.test('should support SVG', async function () {
    assert.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(u('root', [s('#foo.bar', s('circle'))])),
      '<g id="foo" class="bar"><circle></circle></g>'
    )
  })

  await t.test('should support HTML in SVG', async function () {
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
      '<svg><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">Alpha</div></foreignObject></svg>'
    )
  })

  await t.test('should support HTML in SVG in HTML', async function () {
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
      '<div><svg xmlns="http://www.w3.org/2000/svg"><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">Alpha</div></foreignObject></svg></div>'
    )
  })

  await t.test('should stringify namespaced elements', async function () {
    assert.equal(
      processor()
        .use(rehypeDomStringify, {namespace: 'https://example.com'})
        .stringify(u('root', [h('example', 'Alpha')])),
      '<example>Alpha</example>'
    )
  })
})

test('rehype-dom', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('rehype-dom')).sort(), [
      'rehypeDom'
    ])
  })

  await t.test('should parse a complete document', async function () {
    assert.equal(
      rehypeDom()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString(),
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>'
    )
  })

  await t.test('should parse a fragment', async function () {
    assert.equal(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString(),
      '<title>Hi</title><h2>Hello world!</h2>'
    )
  })

  await t.test('should parse as a fragment by default', async function () {
    assert.equal(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString(),
      '<title>Hi</title><h2>Hello world!</h2>'
    )
  })

  await t.test('should not mangle dataset attributes', async function () {
    assert.equal(
      rehypeDom().processSync('<p data-test="true">text, <b>hyper').toString(),
      '<p data-test="true">text, <b>hyper</b></p>'
    )
  })

  await t.test('should support boolean attributes', async function () {
    assert.equal(
      rehypeDom().processSync('<input type="checkbox" checked />').toString(),
      '<input type="checkbox" checked="">'
    )
  })

  await t.test('should not mangle classnames', async function () {
    assert.equal(
      rehypeDom().processSync('<div class="foo bar">baz</div>').toString(),
      '<div class="foo bar">baz</div>'
    )
  })

  await t.test('should support svg', async function () {
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
  </svg>`
    )
  })

  await t.test('should process text in `style` correctly', async function () {
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
</style>`
    )
  })

  await t.test('should work w/ `rehype-starry-night`', async function () {
    assert.equal(
      String(
        await rehypeDom()
          .use(rehypeStarryNight)
          .process(
            `<h1>Hello World!</h1>
  <pre><code class="language-js">var name = "World";
  console.warn("Hello, " + name + "!")</pre></code>`
          )
      ),
      `<h1>Hello World!</h1>
  <pre><code class="language-js"><span class="pl-k">var</span> name <span class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">"</span>World<span class="pl-pds">"</span></span>;
  <span class="pl-en">console</span>.<span class="pl-c1">warn</span>(<span class="pl-s"><span class="pl-pds">"</span>Hello, <span class="pl-pds">"</span></span> <span class="pl-k">+</span> name <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">"</span>!<span class="pl-pds">"</span></span>)</code></pre>`
    )
  })

  await t.test('should work w/ `rehype-slug`', async function () {
    assert.equal(
      rehypeDom()
        .use(rehypeSlug)
        .processSync('<h1>First</h1><h2>Second')
        .toString(),
      '<h1 id="first">First</h1><h2 id="second">Second</h2>'
    )
  })

  await t.test('should work w/ a generic plugin', async function () {
    assert.equal(
      rehypeDom()
        .use(function () {
          /**
           * Transform.
           *
           * @param {Root} tree
           *   Tree.
           * @returns {undefined}
           *   Nothing.
           */
          return function (tree) {
            visit(tree, 'text', function (node) {
              node.value = node.value.split('').reverse().join('')
            })
          }
        })
        .processSync('<p>a man a plan a canal panama</p>')
        .toString(),
      '<p>amanap lanac a nalp a nam a</p>'
    )
  })
})
