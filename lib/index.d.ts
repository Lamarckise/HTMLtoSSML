export declare class HTMLtoSSML {
    config: {
        [id: string]: string[];
    };
    convert(html: string): string;
    deleteHTML(html: string): string;
    convertHTMLTagsToSSMLTags(html: string): string;
    wrapInSpeakTag(html: string): string;
}
