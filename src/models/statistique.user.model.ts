//MODEL STATISTIQUE USER  
export class StatistiqueUser {
    constructor(
        public _id:string,
        public userId : string,
        public followers: number,
        public totalPosts: number,
        public totalPoints: number,       
        ) {
    }
}
