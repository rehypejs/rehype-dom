import unified from 'unified'
import u from 'unist-builder'
import h from 'hastscript'
import s from 'hastscript/svg'

import stringify from '.'

describe('rehype-dom-stringify', () => {
  it('should stringify a complete document', () => {
    expect(
      unified()
        .use(stringify, {fragment: false})
        .stringify(
          u('root', [
            h('html', [
              h('head', h('title', 'Hi')),
              h('body', h('h2', 'Hello world!'))
            ])
          ])
        )
    ).toMatchSnapshot()
  })

  it('should stringify a fragment', () => {
    expect(
      unified()
        .use(stringify)
        .stringify(u('root', [h('title', 'Hi'), h('h2', 'Hello world!')]))
    ).toMatchSnapshot()
  })

  it('should support SVG', () => {
    expect(
      unified()
        .use(stringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(s('#foo.bar', s('circle')))
    ).toMatchSnapshot()
  })

  it('should support HTML in SVG', () => {
    expect(
      unified()
        .use(stringify, {namespace: 'http://www.w3.org/2000/svg'})
        .stringify(
          s('svg', [
            s('foreignObject', [
              h('div', {xmlns: 'http://www.w3.org/1999/xhtml'}, 'Alpha')
            ])
          ])
        )
    ).toMatchSnapshot()
  })

  it('should support HTML in SVG in HTML', () => {
    expect(
      unified()
        .use(stringify)
        .stringify(
          h('div', [
            s('svg', {xmlns: 'http://www.w3.org/2000/svg'}, [
              s('foreignObject', [
                h('div', {xmlns: 'http://www.w3.org/1999/xhtml'}, 'Alpha')
              ])
            ])
          ])
        )
    ).toMatchSnapshot()
  })

  it('should stringify namespaced elements', () => {
    expect(
      unified()
        .use(stringify, {namespace: 'https://example.com'})
        .stringify(h('example', 'Alpha'))
    ).toMatchSnapshot()
  })
})
