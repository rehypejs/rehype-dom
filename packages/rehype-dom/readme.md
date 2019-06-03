# rehype-dom [![Build Status][travis-badge]][travis]

The [**rehype-dom**][rehype-dom] processor is an HTML processor powered by
[plug-ins][plugins].

*   Interface by [**unified**][unified]
*   [**hast**][hast] syntax tree
*   Parses HTML to the tree with [**rehype-parse**][parse]
*   [Plug-ins][plugins] transform the tree
*   Compiles the tree to HTML using [**rehype-stringify**][stringify]

If you're not concerned with bundle size or are in an environment in which you don't trust (or don't
have) the native DOM API, you may prefer to use [`rehype`][rehype] instead.
**Please note** that this library is designed for browser use and defaults to **fragment mode** when
parsing, whereas [`rehype`][rehype] defaults to **document mode**!

Don’t need the parser?  Or the compiler?  [That’s OK][unified-usage].

## Installation

[yarn][]:

```bash
yarn add rehype-dom
```

[npm][]:

```bash
npm install rehype-dom
```

## Usage

```js
import unified from 'unified';
import createStream from 'unified-stream';
import rehypeDom from 'rehype-dom';

rehypeDom().process('<p>text, <b>hyper', (err, file) => {
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

Configuration for [**rehype-dom-parse**][parse] and [**rehype-dom-stringify**][stringify] can be set
with `.data('settings', {/*...*/})`.

## License

[ISC][license] © [Keith McKnight][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/kmck/rehype-dom.svg

[travis]: https://travis-ci.org/kmck/rehype-dom

[yarn]: https://yarnpkg.com/lang/en/docs/install

[npm]: https://docs.npmjs.com/cli/install

[rehype-dom]: https://github.com/kmck/rehype-dom

[license]: https://github.com/kmck/rehype-dom/blob/master/license

[author]: https://keith.mcknig.ht

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/kmck/rehype-dom/blob/master/packages/rehype-dom

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[hast]: https://github.com/syntax-tree/hast

[parse]: https://github.com/kmck/rehype-dom/blob/master/packages/rehype-dom-parse

[stringify]: https://github.com/kmck/rehype-dom/blob/master/packages/rehype-dom-stringify

[plugins]: https://github.com/rehypejs/rehype/blob/master/doc/plugins.md

[rehype]: https://github.com/rehypejs/rehype/tree/master/packages/rehype

[unified-usage]: https://github.com/unifiedjs/unified#usage
