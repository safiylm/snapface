export class User {
    constructor(
        public _id: number,
        public photos_profil: string,
     public photos_background:string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public phoneNo: string,

    ) {
    }
}