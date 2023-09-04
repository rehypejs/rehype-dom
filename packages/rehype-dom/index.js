import rehypeDomParse from 'rehype-dom-parse'
import rehypeDomStringify from 'rehype-dom-stringify'
import {unified} from 'unified'

export const rehypeDom = unified()
  .use(rehypeDomParse)
  .use(rehypeDomStringify)
  .freeze()
