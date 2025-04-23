//MODEL PUBLICATION 
export class Publication {
    constructor(
        public _id:string,
        public title: string,
        public body: string,
        public assets: [ string ],
        public date: number,
        public userId: string,
        public audio:  string ,
        public commentsCount: number,
        public likesCount :number, 
        public pointsCount: number,
        public savesCount: number, 
        ) {
    }
}
