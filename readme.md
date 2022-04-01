# rehype-dom

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

This project is a monorepo that contains alternatives to [rehype][] for use in
browsers.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Example](#example)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This monorepo contains the following packages:

*   [`rehype-dom-parse`][rehype-dom-parse]
    — plugin to take HTML as input and turn it into a syntax tree (hast) in
    browsers
*   [`rehype-dom-stringify`][rehype-dom-stringify]
    — plugin to take a syntax tree (hast) and turn it into HTML as output in
    browsers
*   [`rehype-dom`][api]
    — `unified`, `rehype-dom-parse`, and `rehype-dom-stringify`, useful when
    input and output are HTML

## When should I use this?

You can use this project when you want to use rehype in browsers.
It has a smaller footprint in browsers compared to `rehype` itself as it uses
DOM APIs to do its work.
However, DOM APIs:

*   …cannot provide positional information (each node knowing where it
    originated), which is frequently needed when working with rehype
*   …do not have formatting options that `rehype-stringify` exposes
*   …can provide varying results in different (especially older) browsers
*   …are safe, but untrusted HTML in browsers is always unsafe

## Example

Say our page `example.html` looks as follows:

```html
<!doctype html>
<title>Example</title>
<body>
<script type="module">
  import {rehypeDom} from 'https://esm.sh/rehype-dom@6?bundle'

  const file = await rehypeDom().process('<h1>Hi <del>Mars</del>Venus!</h1>')

  document.body.innerHTML = String(file)
</script>
```

Now running `open example.html` renders the following in `<body>`:

```html
<h1>Hi <del>Mars</del>Venus!</h1>
```

## Security

Use of `rehype-dom` can open you up to a [cross-site scripting (XSS)][xss]
attack if the document is unsafe or unsafe plugins are used.
Use [`rehype-sanitize`][sanitize] to make the tree safe.

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
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

[contributing]: https://github.com/rehypejs/.github/blob/main/contributing.md

[support]: https://github.com/rehypejs/.github/blob/main/support.md

[coc]: https://github.com/rehypejs/.github/blob/main/code-of-conduct.md

[rehype]: https://github.com/rehypejs/rehype

[api]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom

[rehype-dom-parse]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-parse

[rehype-dom-stringify]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-stringify

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
