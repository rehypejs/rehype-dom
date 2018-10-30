import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import highlight from 'rehype-highlight';
import slug from 'rehype-slug';
import visit from 'unist-util-visit';

import rehypeDomParse from 'rehype-dom-parse';
import rehypeDomStringify from 'rehype-dom-stringify';

import rehypeDom from './index';

describe('parse', () => {
  const processor = unified()
    .use(rehypeDomParse)
    .use(rehypeStringify)
    .freeze();

  it('should parse a complete document', () => {
    const outputActual = String(processor().data('settings', { fragment: false }).processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should parse a fragment', () => {
    const outputActual = String(processor().data('settings', { fragment: true }).processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<title>Hi</title><h2>Hello world!</h2>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should parse data-* attributes correctly', () => {
    const outputActual = String(processor().data('settings', { fragment: true }).processSync('<p data-test="true">text, <b>hyper'));
    const outputExpected = '<p data-test="true">text, <b>hyper</b></p>';
    expect(outputActual).toEqual(outputExpected);
  });
});

describe('stringify', () => {
  const processor = unified()
    .use(rehypeParse)
    .use(rehypeDomStringify)
    .freeze();

  it('should stringify a complete document', () => {
    const outputActual = String(processor().data('settings', { fragment: false }).processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should stringify a fragment', () => {
    const outputActual = String(processor().data('settings', { fragment: true }).processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<title>Hi</title><h2>Hello world!</h2>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should stringify data-* attributes correctly', () => {
    const outputActual = String(processor().data('settings', { fragment: true }).processSync('<p data-test="true">text, <b>hyper'));
    const outputExpected = '<p data-test="true">text, <b>hyper</b></p>';
    expect(outputActual).toEqual(outputExpected);
  });
});

describe('rehype-dom', () => {
  it('should parse a complete document', () => {
    const outputActual = String(rehypeDom().data('settings', { fragment: false }).processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should parse a fragment', () => {
    const outputActual = String(rehypeDom().data('settings', { fragment: true }).processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<title>Hi</title><h2>Hello world!</h2>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should parse as a fragment by default', () => {
    const outputActual = String(rehypeDom().processSync('<title>Hi</title><h2>Hello world!'));
    const outputExpected = '<title>Hi</title><h2>Hello world!</h2>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should not mangle data-* attributes', () => {
    const outputActual = String(rehypeDom().processSync('<p data-test="true">text, <b>hyper'));
    const outputExpected = '<p data-test="true">text, <b>hyper</b></p>';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should not mangle data-* attributes', () => {
    const outputActual = String(rehypeDom().processSync('<input type="checkbox" checked />'));
    const outputExpected = '<input type="checkbox" checked="">';
    expect(outputActual).toEqual(outputExpected);
  });

  it('should not mangle classnames', () => {
    const outputActual = String(rehypeDom().processSync('<div class="foo bar">baz</div>'));
    const outputExpected = '<div class="foo bar">baz</div>';
    expect(outputActual).toEqual(outputExpected);
  });

  describe('plugins', () => {
    it('works with a generic plugin', () => {
      function plugin() {
        return function transformer(tree) {
          visit(tree, 'text', (node) => {
            // eslint-disable-next-line no-param-reassign
            node.value = node.value.split('').reverse().join('');
          });
        };
      }

      const outputActual = String(rehypeDom().use(plugin).processSync('<p>a man a plan a canal panama</p>'));
      const outputExpected = '<p>amanap lanac a nalp a nam a</p>';
      expect(outputActual).toEqual(outputExpected);
    });

    it('works with rehype-highlight', () => {
      const outputActual = String(rehypeDom().use(highlight).processSync(`
        <h1>Hello World!</h1>
        <pre><code class="language-js">var name = "World";
        console.warn("Hello, " + name + "!")</pre></code>
      `));
      const outputExpected = `
        <h1>Hello World!</h1>
        <pre><code class="hljs language-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;
        <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>
      `;
      expect(outputActual).toEqual(outputExpected);
    });

    it('works with rehype-slug', () => {
      const outputActual = String(rehypeDom().use(slug).processSync('<h1>First</h1><h2>Second'));
      const outputExpected = '<h1 id="first">First</h1><h2 id="second">Second</h2>';
      expect(outputActual).toEqual(outputExpected);
    });
  });
});
