# rehype-dom-parse [![Build Status][travis-badge]][travis]

[Parser][] for [**unified**][unified]. Parses HTML to a [**HAST**][hast] syntax tree using the
browser DOM API. Used in the [**rehype-dom** processor][processor].

If you're not concerned with bundle size or are in an environment in which you don't trust (or don't
have) the native DOM API, you may prefer to use [`rehype-parse`][rehype-parse] instead.
**Please note** that this library is designed for browser use and defaults to **fragment mode** when
parsing, whereas [`rehype-parse`][rehype-parse] defaults to **document mode**!

## Installation

[yarn][]:

```bash
yarn add rehype-dom-parse
```

[npm][]:

```bash
npm install rehype-dom-parse
```

## Usage

```js
import unified from 'unified';
import createStream from 'unified-stream';
import parse from 'rehype-dom-parse';
import stringify 'rehype-dom-stringify';

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
In document mode, unopened `html`, `head`, and `body` elements are opened in just the right places.

### `parse.Parser`

Access to the [parser][], if you need it.

## License

[ISC][license] © [Keith McKnight][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/kmck/rehype-dom.svg

[travis]: https://travis-ci.org/kmck/rehype-dom

[yarn]: https://yarnpkg.com/lang/en/docs/install

[npm]: https://docs.npmjs.com/cli/install

[license]: https://github.com/kmck/rehype-dom/blob/master/LICENSE

[author]: https://keith.mcknig.ht

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/rehypejs/rehype/blob/master/packages/rehype

[parser]: https://github.com/unifiedjs/unified#processorparser

[hast]: https://github.com/syntax-tree/hast

[rehype-parse]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse
