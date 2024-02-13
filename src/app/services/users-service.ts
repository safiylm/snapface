import { Injectable } from '@angular/core';
import { User } from '../models/user.model'
import { user_array } from '../json-database/users-array';

@Injectable({
    providedIn: 'root'
})

export class UsersService {


    User: User[] = user_array;

    getAllUsers(): User[] {
        return this.User;
    }

    getUserById(id: number): User {
        const User_ = this.User.find(User => User.id === id);
        if (!User_) {
            throw new Error('TextSnap not found!');
        } else {
            return User_;
        }
    }

    pushNewUser(newuser: User): void {
        this.User.push(newuser);
        console.log("user cree")
    }

}