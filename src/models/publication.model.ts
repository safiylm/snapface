//MODEL PUBLICATION 
export class Publication {
    constructor(
        public _id:string,
        public title: string,
        public body: string,
        public assets: [ string ],
        public date: number,
        public userId: string,
        // public videos:[ url : string , title : string  ],
        // public audios: [ url : string , title : string  ],
        
        ) {
    }
}
