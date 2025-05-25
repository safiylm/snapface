//MODEL USER 
export class User {
    constructor(
        public _id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public phoneNo: number,
        public photos_profil: string,
        public photos_background:string,
        public isPrivate : boolean,
        public isOnline : boolean,
        
    ) {
    }
}