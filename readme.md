# rehype-dom

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**rehype-dom** is a DOM-based version of [rehype][] built on [unified][]!

*   [`rehype-dom`][api] — Programmatic interface
*   [`rehype-dom-parse`][parse] — Parser
*   [`rehype-dom-stringify`][stringify] — Stringify

## Security

Use of `rehype-dom` can open you up to a [cross-site scripting (XSS)][xss]
attack if the document is unsafe or unsafe plugins are used.
Use [`rehype-sanitize`][sanitize] to make the tree safe.

## Related

*   [`hast`](https://github.com/syntax-tree/hast)
*   [`rehype`](https://github.com/rehypejs/rehype)
*   [`remark`](https://github.com/remarkjs/remark)
*   [`retext`](https://github.com/retextjs/retext)

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

[build-badge]: https://github.com/rehypejs/rehype-dom/workflows/main/badge.svg

[build]: https://github.com/rehypejs/rehype-dom/actions

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

[author]: https://keith.mcknig.ht

[license]: license

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[rehype]: https://github.com/rehypejs/rehype

[unified]: https://github.com/unifiedjs/unified

[api]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom

[parse]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-parse

[stringify]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-stringify

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
