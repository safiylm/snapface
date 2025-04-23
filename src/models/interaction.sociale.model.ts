//MODEL INTERACTION SOCIAL
export class InteractionSociale {
    constructor(
        public _id: string,
        public postId: string,
        public userId: string,
        public type: 'like' | 'point' | 'share' | 'comment',
        public timestamp: Date,
    ) { }
}
