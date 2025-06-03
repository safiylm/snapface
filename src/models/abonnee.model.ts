//MODEL ABONNEE
export class Abonnee {
    constructor(
        public _id: number,
        public userId: string,
        public follows: string, // la personne suivie
        public createdAt: Date,

    ) { }
}
