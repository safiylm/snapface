//raccourci typscript
export class Publication {
    constructor(
        public _id:string,
    
        public title: string,
        public body: string,
        public images: [ string ],
        public date: number,
        public userId: string,
        public videos:[ url : string , title : string  ],
        public audios: [ url : string , title : string  ],
        
        ) {
    }
}
