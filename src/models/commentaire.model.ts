//MODEL COMMENTAIRE
export class Commentaire {
    constructor(
        public _id:string ,
        public text: string,
        public userId: string,
        public postId: string,
        public isEdited : boolean  |null,
        public isDeleted : boolean |null,
        public createdAt: Date |null ,
        public updatedAt: Date|null 
    ){}
}
