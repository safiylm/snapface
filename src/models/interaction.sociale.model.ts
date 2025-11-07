//MODEL INTERACTION SOCIAL
export class InteractionSociale {
    constructor(
        public _id: string,
        public postId: string,
        public userId: string,
        public type: 'like' | 'repost' | 'enregistrement',
        public createdAt: Date,
    ) { }
}
