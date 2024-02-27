export class Commentaire {
    constructor(
        public _id:number,
        public title: string,
        public date: number,
        public userId: string,
        public postId: string
    
    ){}
}
