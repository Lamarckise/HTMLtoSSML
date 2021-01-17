import * as striptags from 'striptags';

export class HTMLtoSSML {
  public config: { [id: string]: string[] } = {
    allowedTags: ['h1', 'h2', 'h3', 'br', 'p'],
  };

  public convert(html: string): string {
    const stripped = this.deleteHTML(html);
    const converted = this.convertHTMLTagsToSSMLTags(stripped);
    return this.wrapInSpeakTag(converted);
  }

  public deleteHTML(html: string): string {
    return striptags(html, this.config.allowedTags);
  }

  public convertHTMLTagsToSSMLTags(html: string): string {
    // Replace headings with emphasis
    html = html.replace(/<h1>/g, '<emphasis>');
    html = html.replace(/<h2>/g, '<emphasis>');
    html = html.replace(/<h3>/g, '<emphasis>');
    html = html.replace(/<\/h1>/g, '</emphasis>');
    html = html.replace(/<\/h2>/g, '</emphasis>');
    html = html.replace(/<\/h3>/g, '</emphasis>');

    // Replace lines with breaks
    html = html.replace(/<br>/g, '<break>');

    return html;
  }

  public wrapInSpeakTag(html: string): string {
    return '<speak>' + html + '</speak>';
  }
}
