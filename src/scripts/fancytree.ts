import "jquery.fancytree/dist/skin-awesome/ui.fancytree.css";
import "../sass/main.scss";
import "../sass/fancytree.scss";

import { data } from "./CONSTANTS";


import "jquery.fancytree";
import "jquery.fancytree/dist/modules/jquery.fancytree.glyph";

export class Tree {
    constructor(){
        this.bindEvents();
    }

    private bindEvents():void{
        // @ts-ignore
        $("#tree").fancytree({
            icon: false,
            checkbox: true,
            focusOnSelect: false,
            extensions: ["glyph"],
            glyph: {
                preset: "awesome4",
            },
            selectMode: 1,
            source: data,
            click: function(event, data) {
                data.node.setSelected(true);
                console.log(data.node.title);
            }
        });
    }
}
new Tree();