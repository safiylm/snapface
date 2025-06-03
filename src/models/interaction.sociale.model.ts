//MODEL INTERACTION SOCIAL
export class InteractionSociale {
    constructor(
        public _id: string,
        public postId: string,
        public userId: string,
        public type: 'like' | 'point' | 'enregistrement',
        public createdAt: Date,
    ) { }
}
