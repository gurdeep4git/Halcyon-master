import * as heroTemplate from '../Handlebars/templates/heroTemplate.hbs';
import { Hero, HeroModel } from "./hero";

export class UI{
    
    bindHeroList(herosList:Hero[], container:string):void{
        let heroElements = "";
        herosList.forEach(hero=>{
            heroElements += heroTemplate(hero);
        });
        $(container).html(heroElements);
    }

}