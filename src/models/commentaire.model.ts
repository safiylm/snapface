//MODEL COMMENTAIRE
export class Commentaire {
    constructor(
        public _id:string ,
        public title: string,
        public date: number,
        public userId: string,
        public postId: string
    
    ){}
}
