# rehype-dom

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unified**][unified] processor to use browser APIs to parse and compile HTML.

*   Interface by [**unified**][unified]
*   [**hast**][hast] syntax tree
*   Parses HTML to the tree with [**rehype-dom-parse**][parse]
*   [Plug-ins][plugins] transform the tree
*   Compiles the tree to HTML using [**rehype-dom-stringify**][stringify]

If you don’t care about bundle size, or if you don’t trust content, or if you’re
not in a (modern) browser environment, use [`rehype`][rehype] instead.

If you’re not concerned with bundle size or are in an environment in which you
don’t trust (or don’t have) the native DOM API, you may prefer to use
[`rehype`][rehype] instead.

As `rehype-dom` is designed for browser use, it defaults to parsing in
**fragment mode**, whereas [`rehype`][rehype] defaults to **document mode**!

Don’t need the parser?
Or the compiler?
[That’s OK][unified-usage].

## Install

[yarn][]:

```sh
yarn add rehype-dom
```

[npm][]:

```sh
npm install rehype-dom
```

## Use

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

```html
<p>text, <b>hyper</b></p>
```

Configuration for [**rehype-dom-parse**][parse] and
[**rehype-dom-stringify**][stringify] can be set with
`.data('settings', {/*...*/})`.

## Security

Use of `rehype-dom` can open you up to a [cross-site scripting (XSS)][xss]
attack if the document is unsafe or unsafe plugins are used.
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

[downloads-badge]: https://img.shields.io/npm/dm/rehype-dom.svg

[downloads]: https://www.npmjs.com/package/rehype-dom

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-dom.svg

[size]: https://bundlephobia.com/result?p=rehype-dom

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[yarn]: https://yarnpkg.com/lang/en/docs/install

[npm]: https://docs.npmjs.com/cli/install

[author]: https://keith.mcknig.ht

[license]: https://github.com/rehypejs/rehype-dom/blob/main/license

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[unified]: https://github.com/unifiedjs/unified

[hast]: https://github.com/syntax-tree/hast

[parse]: https://github.com/rehypejs/rehype-dom/blob/main/packages/rehype-dom-parse

[stringify]: https://github.com/rehypejs/rehype-dom/blob/main/packages/rehype-dom-stringify

[plugins]: https://github.com/rehypejs/rehype/blob/HEAD/doc/plugins.md

[rehype]: https://github.com/rehypejs/rehype/tree/HEAD/packages/rehype

[unified-usage]: https://github.com/unifiedjs/unified#usage

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
