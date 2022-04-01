# rehype-dom

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[unified][]** processor with support for parsing HTML input and serializing
HTML as output.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`rehypeDom()`](#rehypedom)
*   [Examples](#examples)
    *   [Example: passing options](#example-passing-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is like [`rehype`][rehype] but for browsers.

## When should I use this?

Use this package when you want to use `rehype` in browsers.
See [the monorepo readme][rehype-dom] for info on when to use `rehype-dom`.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install rehype-dom
```

In Deno with [`esm.sh`][esmsh]:

```js
import {rehypeDom} from 'https://esm.sh/rehype-dom@6'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {rehypeDom} from 'https://esm.sh/rehype-dom@6?bundle'
</script>
```

## Use

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

## API

This package exports the following identifier: `rehypeDom`.
There is no default export.

### `rehypeDom()`

Create a new (unfrozen) `unified` processor that already uses `rehype-dom-parse`
and `rehype-dom-stringify` and you can add more plugins to.
See [`unified`][unified] for more information.

> 👉 **Note**: the default of the `fragment` option is `true` in this package,
> which is different from the value in `rehype`, because it makes more sense in
> browsers.

## Examples

### Example: passing options

When you use `remark-dom-parse` and `remark-dom-stringify` manually you can pass
options to `use`.
Because these are already used in `rehype-dom`, that’s not possible.
To define options for them, you can instead pass options to `data`:

```js
import {rehypeDom} from 'https://esm.sh/rehype-dom@6?bundle'

const file = await rehypeDom()
  .data('settings', {fragment: false})
  .process('<!doctype html>' + document.documentElement.outerHTML)

console.log(String(file))
```

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Use of `rehype-dom` can open you up to a [cross-site scripting (XSS)][xss]
attack if the result is used with the actual DOM.
Use [`rehype-sanitize`][rehype-sanitize] to solve that.

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

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[author]: https://keith.mcknig.ht

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[license]: https://github.com/rehypejs/rehype-dom/blob/main/license

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/main/contributing.md

[support]: https://github.com/rehypejs/.github/blob/main/support.md

[coc]: https://github.com/rehypejs/.github/blob/main/code-of-conduct.md

[rehype]: https://github.com/rehypejs/rehype/tree/main/packages/rehype

[rehype-dom]: https://github.com/rehypejs/rehype-dom

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
