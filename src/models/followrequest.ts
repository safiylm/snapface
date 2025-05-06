import { DatePipe } from "@angular/common";

//MODEL FOLLOWREQUEST 
export class FollowRequest {
    constructor(
        public _id: string,
        public to: string,
        public from: string,
        public status: 'pending' | 'accepted' | 'rejected',
        public createdAt: DatePipe
    ) {
    }
}
