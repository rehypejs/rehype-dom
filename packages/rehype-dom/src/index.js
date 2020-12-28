import unified from 'unified'
import parse from 'rehype-dom-parse'
import stringify from 'rehype-dom-stringify'

const rehypeDom = unified().use(parse).use(stringify).freeze()

export default rehypeDom
