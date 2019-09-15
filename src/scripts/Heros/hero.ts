export class Hero{
    id:number;
    name:string;
    email:string;
    phone:string;
    website:string
}

export class HeroModel{
    masterHeros = new Map<number, Hero>();
}
