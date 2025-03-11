//MODEL MESSAGE 
export class Message {
    constructor(
        public _id: string,
        public sender: string,
        public receiver: string,
        public text:  string ,
        public timestamp: number,
        public seen : boolean
        ) {
    }
}
