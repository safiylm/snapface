export class Commentaire {
    constructor(
        public _id:number,
        public title: string,
        public date: Date,
        public userId: string,
        public postId: string
    
    ){}
}
