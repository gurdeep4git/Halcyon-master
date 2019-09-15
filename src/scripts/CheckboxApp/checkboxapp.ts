import "../../sass/main.scss";
import "../../sass/checkboxapp.scss";

import * as HerosCheckbox from "../Handlebars/templates/heroCheckbox.hbs";
import * as HerosSelectedCheckbox from "../Handlebars/templates/heroSelectedCheckbox.hbs";

export class CheckboxApp {
    private URL: string = "https://jsonplaceholder.typicode.com/users";
    private SelectedHeros = new Array();

    constructor() {
        this.bindEvents();
    }

    bindEvents(): void {
        $("#allHerosList").on("change", "input[type='checkbox']", e =>
            this.checkboxChangeHandler($(e.target))
        );
    }

    getHerosFromServer(): any {
        return $.getJSON(this.URL);
    }

    async init() {
        const allHeros = await this.getHerosFromServer();
        this.bindHerosOnUI(allHeros);
    }

    bindHerosOnUI(allHeros: any) {
        $("#allHerosList").append(HerosCheckbox(allHeros));
    }

    checkboxChangeHandler($element: JQuery<HTMLElement>) {
        let selectedHeroObj = {};
        const id = this.extractID($element);
        const name = this.extractName($element);
        selectedHeroObj = {
            id: id,
            name: name
        };
        this.SelectedHeros.push(selectedHeroObj);
        console.log(this.SelectedHeros);
        this.bindSelectedHerosOnUI(this.SelectedHeros);
    }

    bindSelectedHerosOnUI(SelectedHeros: any[]) {
        $("#selectedHerosList").append(HerosSelectedCheckbox(SelectedHeros));
    }

    extractName($element: JQuery<HTMLElement>): string {
        return $element.attr("data-name");
    }

    extractID($element: JQuery<HTMLElement>): number {
        const idAttr = $element.attr("id");
        return Number(idAttr.split("_").pop());
    }
}
new CheckboxApp().init();
