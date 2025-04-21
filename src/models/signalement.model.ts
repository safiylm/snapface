//MODEL SIGNALEMENT
export class Signalement {
    constructor(
        public _id: string ,
        public auteur: string,
        public date: number ,
        public raison: string,
        public postId: string|null, //Signale un post 
        public userId: string|null, //Signale un user 
    ) { }
}
