//MODEL INTERACTION SOCIAL
export class InteractionSociale {
    constructor(
        public _id:string ,
        public postId: string,
        public comments: number,
        public likes: number,
        public points: number,
        public likedBy_: [ string ],
        public pointedBy_: [ string ],
    ){}
}
