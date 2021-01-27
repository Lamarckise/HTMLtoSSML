import { HTMLtoSSML } from '../index';

describe('striptags', () => {
  test('headers', () => {
    const converter = new HTMLtoSSML();
    const html = '<h1>Test</h1>';
    expect(converter.deleteHTML(html)).toBe(html);
  });
  test('change-allowedTags', () => {
    const converter = new HTMLtoSSML();
    converter.config.allowedTags = ['a'];
    let html = '<a>Test</a>';
    expect(converter.deleteHTML(html)).toBe(html);
    html = '<h1>Test</h1>';
    expect(converter.deleteHTML(html)).toBe('Test');
  });
});

describe('realTest', () => {
  test('simple', () => {
    const converter = new HTMLtoSSML();
    const html = "<html><body><div class='container'><p>Test article</p></div></body></html>";
    const ssml = '<p>Test article</p>';
    expect(converter.deleteHTML(html)).toBe(ssml);
  });
});

describe('replace tags', () => {
  test('h1', () => {
    const converter = new HTMLtoSSML();
    const html = '<h1>Test</h1>';
    expect(converter.convertHTMLTagsToSSMLTags(html)).toBe('<emphasis>Test</emphasis>');
  });
  test('h2', () => {
    const converter = new HTMLtoSSML();
    const html = '<h2>Test</h2>';
    expect(converter.convertHTMLTagsToSSMLTags(html)).toBe('<emphasis>Test</emphasis>');
  });
  test('h3', () => {
    const converter = new HTMLtoSSML();
    const html = '<h3>Test</h3>';
    expect(converter.convertHTMLTagsToSSMLTags(html)).toBe('<emphasis>Test</emphasis>');
  });
  test('br', () => {
    const converter = new HTMLtoSSML();
    const html = 'Test<br>New line';
    expect(converter.convertHTMLTagsToSSMLTags(html)).toBe('Test<break>New line');
  });
});

describe('wrap in speak tags', () => {
  test('simple', () => {
    const converter = new HTMLtoSSML();
    const html = 'Test';
    expect(converter.wrapInSpeakTag(html)).toBe('<speak>Test</speak>');
  });
});

describe('complete test', () => {
  test('simple 1', () => {
    const converter = new HTMLtoSSML();
    const html = "<html><body><div class='container'><p>Test article</p></div></body></html>";
    const ssml = '<speak><p>Test article</p></speak>';
    expect(converter.convert(html)).toBe(ssml);
  });
  test('simple 2', () => {
    const converter = new HTMLtoSSML();
    const html = "<html><body><div class='container'><h1>Title</h1><p>Test article</p></div></body></html>";
    const ssml = '<speak><emphasis>Title</emphasis><p>Test article</p></speak>';
    expect(converter.convert(html)).toBe(ssml);
  });
  test('simple 3', () => {
    const converter = new HTMLtoSSML();
    const html = "<html><body><div class='container'><h1>Title</h1><p>Test article<br>New line</p></div></body></html>";
    const ssml = '<speak><emphasis>Title</emphasis><p>Test article<break>New line</p></speak>';
    expect(converter.convert(html)).toBe(ssml);
  });
});

describe('split test', () => {
  test('simple', () => {
    const converter = new HTMLtoSSML();
    const html = "<html><body><div class='container'><p>Test article</p></div><div><span>Test2</span></div></body></html>";
    const ssml = [
      "<speak><p>Test article</p></speak>",
      "<speak>Test2</speak>"
    ];
    expect(converter.convertInParts(html, 19)).toStrictEqual(ssml);
  })
})
