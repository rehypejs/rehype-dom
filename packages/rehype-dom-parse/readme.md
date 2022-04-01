# rehype-dom-parse

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[rehype][]** plugin to add support for parsing HTML input in browsers.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified.use(rehypeDomParse[, options])`](#unifieduserehypedomparse-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is like [`rehype-parse`][rehype-parse] but for browsers.
This plugin uses DOM APIs to do its work, which makes it smaller in browsers, at
the cost of not supporting positional info on nodes.

## When should I use this?

Use this package when you want to use `rehype-parse` solely in browsers.
See [the monorepo readme][rehype-dom] for info on when to use `rehype-dom`.

This plugin is built on [`hast-util-from-dom`][hast-util-from-dom], which is a
low level tool to turn DOM nodes into hast syntax trees.
rehype focusses on making it easier to transform content by abstracting such
internals away.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install rehype-dom-parse
```

In Deno with [`esm.sh`][esmsh]:

```js
import rehypeDomParse from 'https://esm.sh/rehype-dom-parse@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import rehypeDomParse from 'https://esm.sh/rehype-dom-parse@4?bundle'
</script>
```

## Use

Say our page `example.html` looks as follows:

```html
<!doctype html>
<title>Example</title>
<body>
<script type="module">
  import {unified} from 'https://esm.sh/unified@10?bundle'
  import rehypeDomParse from 'https://esm.sh/rehype-dom-parse@4?bundle'
  import rehypeRemark from 'https://esm.sh/rehype-remark@8?bundle'
  import remarkStringify from 'https://esm.sh/remark-stringify@10?bundle'

  const file = await unified()
    .use(rehypeDomParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(`<h1>Hi</h1>
<p><em>Hello</em>, world!</p>`)

  console.log(String(file))
</script>
```

Now running `open example.html` prints the following to the console:

```markdown
# Hi

*Hello*, world!
```

## API

This package exports no identifiers.
The default export is `rehypeDomParse`.

### `unified.use(rehypeDomParse[, options])`

Add support for parsing HTML input.

##### `options`

Configuration (optional).

###### `options.fragment`

Specify whether to parse a fragment (`boolean`, default: `true`), instead of a
complete document.
In document mode, unopened `html`, `head`, and `body` elements are opened in
just the right places.

> 👉 **Note**: the default of the `fragment` option is `true` in this package,
> which is different from the value in `rehype-parse`, because it makes more
> sense in browsers.

## Types

This package is fully typed with [TypeScript][].
The extra type `Options` is exported.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Use of `rehype-dom-parse` itself is safe but see `rehype`, `rehype-dom`, or
`rehype-dom-stringify` for more information on potential security problems.

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

[downloads-badge]: https://img.shields.io/npm/dm/rehype-dom-parse.svg

[downloads]: https://www.npmjs.com/package/rehype-dom-parse

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-dom-parse.svg

[size]: https://bundlephobia.com/result?p=rehype-dom-parse

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[author]: https://keith.mcknig.ht

[license]: https://github.com/rehypejs/rehype-dom/blob/main/license

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/main/contributing.md

[support]: https://github.com/rehypejs/.github/blob/main/support.md

[coc]: https://github.com/rehypejs/.github/blob/main/code-of-conduct.md

[rehype]: https://github.com/rehypejs/rehype

[rehype-dom]: https://github.com/rehypejs/rehype-dom

[rehype-parse]: https://github.com/rehypejs/rehype/tree/main/packages/rehype-parse

[hast-util-from-dom]: https://github.com/syntax-tree/hast-util-from-dom
