export class Abonnee {
    constructor(
        public _id: number,
        public userId: string,
        public followers: [string],
    ) { }
}
