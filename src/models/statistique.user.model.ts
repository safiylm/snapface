export class StatistiqueUser {
    constructor(
        public _id:number,
        public userId : string,
        public followers: number,
        public totalPosts: number,
        public totalPoints: number,       
        ) {
    }
}
