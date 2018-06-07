import unified from 'unified';

import parse from './index';

describe('rehype-dom-stringify', () => {
  const processor = unified().use(parse).freeze();

  it('should stringify a complete document', () => {
    const result = processor()
      .data('settings', { fragment: false })
      .stringify({
        type: 'root',
        children: [{
          type: 'element',
          tagName: 'html',
          properties: {},
          children: [{
            type: 'element',
            tagName: 'head',
            properties: {},
            children: [{
              type: 'element',
              tagName: 'title',
              properties: {},
              children: [{
                type: 'text',
                value: 'Hi',
              }],
            }],
          }, {
            type: 'element',
            tagName: 'body',
            properties: {},
            children: [{
              type: 'element',
              tagName: 'h2',
              properties: {},
              children: [{
                type: 'text',
                value: 'Hello world!',
              }],
            }],
          }],
        }],
      });
    expect(result).toMatchSnapshot();
  });

  it('should stringify a fragment', () => {
    const result = processor()
      .data('settings', { fragment: true })
      .stringify({
        type: 'root',
        children: [{
          type: 'element',
          tagName: 'title',
          properties: {},
          children: [{
            type: 'text',
            value: 'Hi',
          }],
        }, {
          type: 'element',
          tagName: 'h2',
          properties: {},
          children: [{
            type: 'text',
            value: 'Hello world!',
          }],
        }],
      });
    expect(result).toMatchSnapshot();
  });
});
