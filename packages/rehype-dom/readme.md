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
*   [Syntax](#syntax)
*   [Syntax tree](#syntax-tree)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is like [`rehype`][rehype] but for browsers.

## When should I use this?

Use this package when you want to use `rehype` in browsers.
There are some limitations: see [the monorepo readme][rehype-dom] for info on
when (not) to use `rehype-dom`.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

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

Say our page `example.html` contains:

```html
<!doctype html>
<title>Example</title>
<body>
<script type="module">
  import {rehypeDom} from 'https://esm.sh/rehype-dom@7?bundle'

  const file = await rehypeDom().process('<h1>Hi <del>Mars</del>Venus!</h1>')

  document.body.innerHTML = String(file)
</script>
```

…opening it in a browser renders the following in `<body>`:

```html
<h1>Hi <del>Mars</del>Venus!</h1>
```

## API

This package exports the identifier [`rehypeDom`][api-rehype-dom].
There is no default export.

### `rehypeDom()`

Create a new unified processor that already uses
[`rehype-dom-parse`][rehype-dom-parse] and
[`rehype-dom-stringify`][rehype-dom-stringify].

You can add more plugins with `use`.
See [`unified`][unified] for more information.

> 👉 **Note**: the default of the `fragment` option is `true` in this package,
> which is different from the value in `rehype`, because it makes more sense in
> browsers.

## Examples

### Example: passing options

When you use `rehype-dom-parse` or `rehype-dom-stringify` manually you can pass
options directly to them with `use`.
Because both plugins are already used in `rehype`, that’s not possible.
To define options for them, you can instead pass options to `data`:

```js
import {rehypeDom} from 'https://esm.sh/rehype-dom@6?bundle'

const file = await rehypeDom()
  .data('settings', {fragment: false})
  .process('<!doctype html>' + document.documentElement.outerHTML)

console.log(String(file))
```

## Syntax

HTML is parsed and serialized according to what a browser supports (which
*should* be WHATWG HTML).

## Syntax tree

The syntax tree used in rehype is [hast][].

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

It also registers `Settings` with `unified`.
If you’re passing options with `.data('settings', …)`, make sure to import this
package somewhere in your types, as that registers the fields.

```js
/**
 * @typedef {import('rehype-dom')}
 */

import {unified} from 'unified'

// @ts-expect-error: `thisDoesNotExist` is not a valid option.
unified().data('settings', {thisDoesNotExist: false})
```

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line,
`rehype-dom@^7`, compatible with Node.js 16.

## Security

Use of `rehype-dom` can open you up to a [cross-site scripting (XSS)][xss]
attack if dangerous content is used and the result is used with the actual DOM.
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

[size-badge]: https://img.shields.io/bundlejs/size/rehype-dom

[size]: https://bundlejs.com/?q=rehype-dom

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[author]: https://keith.mcknig.ht

[license]: https://github.com/rehypejs/rehype-dom/blob/main/license

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/main/contributing.md

[support]: https://github.com/rehypejs/.github/blob/main/support.md

[coc]: https://github.com/rehypejs/.github/blob/main/code-of-conduct.md

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[hast]: https://github.com/syntax-tree/hast

[rehype]: https://github.com/rehypejs/rehype/tree/main/packages/rehype

[rehype-dom]: https://github.com/rehypejs/rehype-dom

[rehype-dom-parse]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-parse

[rehype-dom-stringify]: https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-stringify

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[api-rehype-dom]: #rehypedom
