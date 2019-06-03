# rehype-dom-stringify [![Build Status][travis-badge]][travis]

[Compiler][] for [**unified**][unified]. Stringifies a [**HAST**][hast] syntax tree to HTML using
the browser DOM API. Used in the [**rehype-dom** processor][processor].

If you're not concerned with bundle size or are in an environment in which you don't trust (or don't
have) the native DOM API, you may prefer to use [`rehype-stringify`][rehype-stringify] instead.
**Please note** that this library is designed for browser use and defaults to **fragment mode** when
parsing, whereas [`rehype-stringify`][rehype-stringify] defaults to **document mode**!

## Installation

[yarn][]:

```bash
yarn add rehype-dom-stringify
```

[npm][]:

```bash
npm install rehype-dom-stringify
```

## Usage

```js
import unified from 'unified';
import createStream from 'unified-stream';
import parse from 'rehype-dom-parse';
import stringify from 'rehype-dom-stringify';

const processor = unified()
  .use(parse)
  .use(stringify)
  .data('settings', { fragment: true })

processor.process('<p>text, <b>hyper', (err, file) => {
  if (err) {
    console.error(err);
  } else {
    console.log(String(file));
  }
});
```

Yields:

```
<p>text, <b>hyper</b></p>
```

## API

### `processor.use(parse[, options])`

Configure the `processor` to read HTML as input and process a
[**HAST**][hast] syntax tree.

##### `options`

###### `options.fragment`

Specify whether to parse a fragment (`boolean`, default: `true`), instead of a complete document.
In document mode, an `html` element is added to a fragment when needed.

## License

[ISC][license] © [Keith McKnight][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/kmck/rehype-dom.svg

[travis]: https://travis-ci.org/kmck/rehype-dom

[yarn]: https://yarnpkg.com/lang/en/docs/install

[npm]: https://docs.npmjs.com/cli/install

[license]: https://github.com/kmck/rehype-dom/blob/master/license

[author]: https://keith.mcknig.ht

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/kmck/rehype-dom/blob/master/packages/rehype-dom

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[hast]: https://github.com/syntax-tree/hast

[rehype-stringify]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-stringify
