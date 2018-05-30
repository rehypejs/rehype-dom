import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
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
});

describe('stringify', () => {
  const processor = unified()
    .use(rehypeParse)
    .use(rehypeDomStringify)
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
});
