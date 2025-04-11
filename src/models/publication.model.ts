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
        
        ) {
    }
}
