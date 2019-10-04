//import "../../sass/main.scss";
// import "../../sass/checkboxapp.scss";

import * as HerosCheckbox from "../Handlebars/templates/heroCheckbox.hbs";
import * as HerosSelectedCheckbox from "../Handlebars/templates/heroSelectedCheckbox.hbs";

export class CheckboxApp {
    private URL: string = "https://jsonplaceholder.typicode.com/users";
    private SelectedHeros = new Map();

    constructor() {
        this.bindEvents();
    }

    bindEvents(): void {
        $("#allHerosList").on("change", "input[type='checkbox']", e =>
            this.checkboxChangeHandler($(e.target))
        );
        $("#selectedHerosList").on("change", "input[type='checkbox']", e =>
            this.selectedCheckboxChangeHandler($(e.target))
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
        $("#allHerosList").html(HerosCheckbox(allHeros));
    }

    checkboxChangeHandler($element: JQuery<HTMLElement>) {
        const isChecked = $element.prop("checked");
        const id = this.extractID($element);
        const name = this.extractName($element);
        if(isChecked){
            this.SelectedHeros.set(id,{id,name});
        }
        else{
            this.SelectedHeros.delete(id);
        }
        const herosArr = this.getArrayFromMap(this.SelectedHeros);
        this.bindSelectedHerosOnUI(herosArr);
    }

    selectedCheckboxChangeHandler($element: JQuery<HTMLElement>){
        const id = this.extractID($element);
        this.SelectedHeros.delete(id);
        $element.parent('li').remove();
        this.updateAllHerosUI(id);
    }

    updateAllHerosUI(id: number) {
        $("#allHerosList").find("#allHero_"+ id).prop("checked",false);
    }

    getArrayFromMap(SelectedHeros:any) {
        return Array.from(SelectedHeros.values());
    }

    bindSelectedHerosOnUI(SelectedHeros: any[]) {
        $("#selectedHerosList").html(HerosSelectedCheckbox(SelectedHeros));
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
