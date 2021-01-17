import * as striptags from 'striptags';

export class HTMLtoSSML {
    public config: { [id: string]: Array<string> } = {
        allowedTags: ['h1', 'h2', 'h3', 'br']
    }

    public deleteHTML (html: string): string {
        return striptags(html, this.config.allowedTags);
    }

    public convertHTMLTagsToSSMLTags (html: string): string {
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
}
