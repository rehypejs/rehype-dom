# rehype-dom-parse

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**rehype**][rehype] plugin to use browser APIs to parse HTML.
[Parser][] for [**unified**][unified].
Used in the [**rehype-dom** processor][processor].

If you don’t care about bundle size, or if you don’t trust content, or if you’re
not in a (modern) browser environment, use [`rehype-parse`][rehype-parse]
instead.

As `rehype-dom-parse` is designed for browser use, it defaults to parsing in
**fragment mode**, whereas [`rehype-parse`][rehype-parse] defaults to **document
mode**!

## Install

[yarn][]:

```sh
yarn add rehype-dom-parse
```

[npm][]:

```sh
npm install rehype-dom-parse
```

## Use

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

```html
<p>text, <b>hyper</b></p>
```

## API

### `processor.use(parse[, options])`

Configure `processor` to parse HTML as input and transform it to
[**hast**][hast].

##### `options`

###### `options.fragment`

Specify whether to parse a fragment (`boolean`, default: `true`), instead of a
complete document.
In document mode, unopened `html`, `head`, and `body` elements are opened in
just the right places.

## Security

Use of `rehype-dom-parse` can open you up to a [cross-site scripting (XSS)][xss]
attack if the DOM is unsafe.
Use [`rehype-sanitize`][sanitize] to make the tree safe.

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[ISC][license] © [Keith McKnight][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-dom.svg

[build]: https://travis-ci.org/rehypejs/rehype-dom

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-dom.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-dom

[downloads-badge]: https://img.shields.io/npm/dm/rehype-dom-parse.svg

[downloads]: https://www.npmjs.com/package/rehype-dom-parse

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-dom-parse.svg

[size]: https://bundlephobia.com/result?p=rehype-dom-parse

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[yarn]: https://yarnpkg.com/lang/en/docs/install

[npm]: https://docs.npmjs.com/cli/install

[author]: https://keith.mcknig.ht

[license]: https://github.com/rehypejs/rehype-dom/blob/main/license

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/rehypejs/rehype/blob/HEAD/packages/rehype

[parser]: https://github.com/unifiedjs/unified#processorparser

[hast]: https://github.com/syntax-tree/hast

[rehype]: https://github.com/rehypejs/rehype

[rehype-parse]: https://github.com/rehypejs/rehype/tree/HEAD/packages/rehype-parse

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
