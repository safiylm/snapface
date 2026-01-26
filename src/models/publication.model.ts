//MODEL PUBLICATION 
export class Publication {
    constructor(
        public _id: string,
        public body: string,
        public assets: string[],
        public userId: string,
        public audio: string,

        public commentsCount: number,
        public likesCount: number,
        public repostsCount: number,
        public savesCount: number,
        public sharesCount: number,
        
        public isEdited: boolean |null,
        public isDeleted: boolean |null,
        public createdAt: Date|null, 
        public updatedAt: Date |null
    ) {
    }
}
