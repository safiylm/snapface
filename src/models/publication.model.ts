//raccourci typscript
export class Publication {
    constructor(
        public id:number,
    
        public title: string,
        public description: string,
        public body: string,
        public images: [ string ],
        public date: Date,
        public snaps: number,
        public userId: number,
        public createdBy: string , //User
        public videos:[ url : string , title : string  ],
        public audios: [ url : string , title : string  ],
        
        ) {
    }
}
