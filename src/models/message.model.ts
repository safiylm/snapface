//MODEL MESSAGE 
export class Message {
    constructor(
        public _id: string,
        public sender: string,
        public receiver: string,
        public text:  string|null ,
        public postId: string|null,
        public timestamp: number,
        public seen : boolean
        ) {
    }
}
