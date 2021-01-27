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

  public convertInParts(html: string, length: number): string[] {
    const stripped = this.deleteHTML(html);
    const converted = this.convertHTMLTagsToSSMLTags(stripped);
    return this.splitInParts(converted, length);
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

  public splitInParts(html: string, length: number): string[] {
    let parts = this.getStringParts(html, length);
    if (parts !== null) {
      parts = parts.map((p) => {
        return this.wrapInSpeakTag(p);
      });
      return parts;  
    }
    return [];
  }

  private getStringParts = (str: string, len: number) => {
    const regex = new RegExp(".{1," + len + "}(\s|$|<\/p>|<\/break>|<\/emphasis>)", "g");
    let res = str.match(regex)
    return res;
}
}
