"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLtoSSML = void 0;
var striptags = require("striptags");
var HTMLtoSSML = /** @class */ (function () {
    function HTMLtoSSML() {
        this.config = {
            allowedTags: ['h1', 'h2', 'h3', 'br', 'p']
        };
    }
    HTMLtoSSML.prototype.convert = function (html) {
        var stripped = this.deleteHTML(html);
        var converted = this.convertHTMLTagsToSSMLTags(stripped);
        return this.wrapInSpeakTag(converted);
    };
    HTMLtoSSML.prototype.deleteHTML = function (html) {
        return striptags(html, this.config.allowedTags);
    };
    HTMLtoSSML.prototype.convertHTMLTagsToSSMLTags = function (html) {
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
    };
    HTMLtoSSML.prototype.wrapInSpeakTag = function (html) {
        return '<speak>' + html + '</speak>';
    };
    return HTMLtoSSML;
}());
exports.HTMLtoSSML = HTMLtoSSML;
