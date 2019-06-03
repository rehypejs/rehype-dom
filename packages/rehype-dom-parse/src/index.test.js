import unified from 'unified';

import parse from './index';

describe('rehype-dom-parse', () => {
  it('should parse a complete document', () => {
    expect(
      unified()
        .use(parse)
        .data('settings', { fragment: false })
        .parse('<title>Hi</title><h2>Hello world!'),
    ).toMatchSnapshot();
  });

  it('should parse a fragment', () => {
    expect(
      unified()
        .use(parse)
        .parse('<title>Hi</title><h2>Hello world!'),
    ).toMatchSnapshot();
  });
});
