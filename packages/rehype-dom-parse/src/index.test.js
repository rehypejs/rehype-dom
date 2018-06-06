import unified from 'unified';

import parse from './index';

describe('rehype-dom-parse', () => {
  const processor = unified().use(parse).freeze();

  it('should parse a complete document', () => {
    const result = processor()
      .data('settings', { fragment: false })
      .parse('<title>Hi</title><h2>Hello world!');
    expect(result).toMatchSnapshot();
  });

  it('should parse a fragment', () => {
    const result = processor()
      .data('settings', { fragment: true })
      .parse('<title>Hi</title><h2>Hello world!');
    expect(result).toMatchSnapshot();
  });
});
