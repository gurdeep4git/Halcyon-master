
import * as handlebars from "handlebars";

export default function  (arr: Object[] ) {
    //@ts-ignore
    var langs = arr.map(lang=>lang.name);
    let html = "";
    langs.forEach(function(item,i)
    {
        html += `<span>${item}</span>`;
    });
    return html;
}
