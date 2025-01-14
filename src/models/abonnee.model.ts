//MODEL ABONNEE
export class Abonnee {
    constructor(
        public _id: number,
        public userId: string,
        public followers: [string], //les gens qui suivent userId 
        public abonnements: [string], //les gens que je suis 
    ) { }
}
