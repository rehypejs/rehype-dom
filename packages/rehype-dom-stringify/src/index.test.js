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

  it('should support SVG', () => {
    const result = processor()
      .data('settings', { fragment: true, namespace: 'http://www.w3.org/2000/svg' })
      .stringify({
        type: 'element',
        tagName: 'g',
        properties: {
          id: 'foo',
          className: ['bar'],
        },
        children: [
          {
            type: 'element',
            tagName: 'circle',
            properties: {},
            children: [],
          },
        ],
      });

    expect(result).toMatchSnapshot();
  });

  it('should support HTML in SVG', () => {
    const result = processor()
      .data('settings', { fragment: true, namespace: 'http://www.w3.org/2000/svg' })
      .stringify({
        type: 'element',
        tagName: 'svg',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'foreignObject',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { xmlns: 'http://www.w3.org/1999/xhtml' },
                children: [
                  { type: 'text', value: 'Alpha' },
                ],
              },
            ],
          },
        ],
      });

    expect(result).toMatchSnapshot();
  });

  it('should support HTML in SVG in HTML', () => {
    const result = processor()
      .data('settings', { fragment: true })
      .stringify({
        type: 'element',
        tagName: 'div',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: { xmlns: 'http://www.w3.org/2000/svg' },
            children: [
              {
                type: 'element',
                tagName: 'foreignObject',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'div',
                    properties: { xmlns: 'http://www.w3.org/1999/xhtml' },
                    children: [
                      { type: 'text', value: 'Alpha' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

    expect(result).toMatchSnapshot();
  });

  it('should stringify namespaced elements', () => {
    const result = processor()
      .data('settings', { fragment: true, namespace: 'https://example.com' })
      .stringify({
        type: 'element',
        tagName: 'example',
        properties: {},
        children: [
          { type: 'text', value: 'Alpha' },
        ],
      });

    expect(result).toMatchSnapshot();
  });
});
