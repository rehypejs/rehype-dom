import unified from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import highlight from 'rehype-highlight'
import slug from 'rehype-slug'
import visit from 'unist-util-visit'

import rehypeDomParse from 'rehype-dom-parse'
import rehypeDomStringify from 'rehype-dom-stringify'
import rehypeDom from '.'

describe('parse', () => {
  const processor = unified().use(rehypeDomParse).use(rehypeStringify).freeze()

  it('should parse a complete document', () => {
    const actual = String(
      processor()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
    )
    const expected =
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>'
    expect(actual).toEqual(expected)
  })

  it('should parse a fragment', () => {
    const actual = String(
      processor().processSync('<title>Hi</title><h2>Hello world!')
    )
    const expected = '<title>Hi</title><h2>Hello world!</h2>'
    expect(actual).toEqual(expected)
  })

  it('should parse data-* attributes correctly', () => {
    const actual = String(
      processor().processSync('<p data-test="true">text, <b>hyper')
    )
    const expected = '<p data-test="true">text, <b>hyper</b></p>'
    expect(actual).toEqual(expected)
  })
})

describe('stringify', () => {
  const processor = unified().use(rehypeParse).use(rehypeDomStringify).freeze()

  it('should stringify a complete document', () => {
    expect(
      processor()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString()
    ).toEqual(
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>'
    )
  })

  it('should stringify a fragment', () => {
    expect(
      processor()
        .data('settings', {fragment: true})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString()
    ).toEqual('<title>Hi</title><h2>Hello world!</h2>')
  })

  it('should stringify data-* attributes correctly', () => {
    expect(
      processor()
        .data('settings', {fragment: true})
        .processSync('<p data-test="true">text, <b>hyper')
        .toString()
    ).toEqual('<p data-test="true">text, <b>hyper</b></p>')
  })
})

describe('rehype-dom', () => {
  it('should parse a complete document', () => {
    expect(
      rehypeDom()
        .data('settings', {fragment: false})
        .processSync('<title>Hi</title><h2>Hello world!')
        .toString()
    ).toEqual(
      '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>'
    )
  })

  it('should parse a fragment', () => {
    expect(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString()
    ).toEqual('<title>Hi</title><h2>Hello world!</h2>')
  })

  it('should parse as a fragment by default', () => {
    expect(
      rehypeDom().processSync('<title>Hi</title><h2>Hello world!').toString()
    ).toEqual('<title>Hi</title><h2>Hello world!</h2>')
  })

  it('should not mangle data-* attributes', () => {
    expect(
      rehypeDom().processSync('<p data-test="true">text, <b>hyper').toString()
    ).toEqual('<p data-test="true">text, <b>hyper</b></p>')
  })

  it('should support boolean attributes', () => {
    expect(
      rehypeDom().processSync('<input type="checkbox" checked />').toString()
    ).toEqual('<input type="checkbox" checked="" />')
  })

  it('should not mangle classnames', () => {
    expect(
      rehypeDom().processSync('<div class="foo bar">baz</div>').toString()
    ).toEqual('<div class="foo bar">baz</div>')
  })

  it('should support svg', () => {
    expect(
      rehypeDom()
        .processSync(
          `<svg width=230 height=120 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink>
  <circle cx=60 cy=60 r=50 fill=red />
  <circle cx=170 cy=60 r=50 fill=green />
</svg>`
        )
        .toString()
    )
      .toEqual(`<svg xmlns="http://www.w3.org/2000/svg" width="230" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="60" cy="60" r="50" fill="red"/>
  <circle cx="170" cy="60" r="50" fill="green"/>
</svg>`)
  })

  describe('plugins', () => {
    it('works with a generic plugin', () => {
      expect(
        rehypeDom()
          .use(plugin)
          .processSync('<p>a man a plan a canal panama</p>')
          .toString()
      ).toEqual('<p>amanap lanac a nalp a nam a</p>')

      function plugin() {
        return transformer
      }

      function transformer(tree) {
        visit(tree, 'text', visitor)
      }

      function visitor(node) {
        node.value = node.value.split('').reverse().join('')
      }
    })

    it('works with rehype-highlight', () => {
      expect(
        rehypeDom()
          .use(highlight)
          .processSync(
            `<h1>Hello World!</h1>
<pre><code class="language-js">var name = "World";
console.warn("Hello, " + name + "!")</pre></code>`
          )
          .toString()
      ).toEqual(`<h1>Hello World!</h1>
<pre><code class="hljs language-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;
<span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>`)
    })

    it('works with rehype-slug', () => {
      expect(
        rehypeDom().use(slug).processSync('<h1>First</h1><h2>Second').toString()
      ).toEqual('<h1 id="first">First</h1><h2 id="second">Second</h2>')
    })
  })
})
