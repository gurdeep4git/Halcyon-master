import { UI } from './ui';
import { Hero, HeroModel } from './hero';
import { MasterStorage } from './master-storage';

import "../../sass/main.scss";
import "../../sass/index.scss";




export class HeroApp{
    private URL: string = 'https://jsonplaceholder.typicode.com/users';
    private heroModel: HeroModel;
    private ui: UI;
    private storge : MasterStorage;
    private masterHeros: Promise<Hero[]>;
    private masterHerosData :Hero[];
    

    constructor() {
        this.heroModel = new HeroModel();
        this.ui = new UI();
        this.storge = new MasterStorage();
        
        if(localStorage.getItem(this.storge.storageKey) == null){
            this.masterHeros = $.getJSON(this.URL);
        }
        else{
            this.masterHerosData = JSON.parse(localStorage.getItem(this.storge.storageKey));   
        }
        
        this.bindEvents();
    }

    bindEvents(){
        $("#heroBlock").on("click",".del-hero",e=>this.deleteHero($(e.target)));
    }

    async initAsync(){
        if(localStorage.getItem(this.storge.storageKey) == null){
            this.masterHerosData = await this.masterHeros;
            this.storge.set(this.storge.storageKey,this.masterHerosData);
        }
        this.populateMasterHeros(this.masterHerosData);
        const heros = this.getHerosListFromDS(this.heroModel.masterHeros);
        this.ui.bindHeroList(heros, "#heroBlock");
    }

    private populateMasterHeros(heros:Hero[]):void{
        heros.forEach((item)=>{
            this.heroModel.masterHeros.set(item.id, item);
        });
    }

    private getHerosListFromDS(masterHeros: Map<number,Hero>): Hero[]{
        const heros: Hero[] = [];
        Array.from(masterHeros.values()).forEach(item=>{
            let obj : Hero = {
                id:item.id,
                name:item.name,
                email:item.email,
                website:item.website,
                phone:item.phone
            }
            heros.push(obj);
        });
        return heros;
    }

    private deleteHero(elem:JQuery<HTMLElement>):void{
        let id :number = Number(elem.attr('id'));
        
        if(this.heroModel.masterHeros.has(id)){
            this.heroModel.masterHeros.delete(id);
        }
        
        const heros = this.getHerosListFromDS(this.heroModel.masterHeros);
        this.ui.bindHeroList(heros, "#heroBlock");
    }
}
new HeroApp().initAsync();