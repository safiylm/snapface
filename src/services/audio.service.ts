import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/models/message.model';

@Injectable({
    providedIn: 'root'
})
export class AudioService {


    audioList = [
        {
            id: "a001",
            url: "../../assets/audio/Flint - March the Machine.mp3",
            title: "Flint - March the Machine",
            cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
        },
        {
            id: "a002",
            url: "../../assets/audio/Superlative - The Wave.mp3",
            title: "Superlative - The Wave",
            cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
        },
        {
            id: "a003",
            url: "../../assets/audio/Litos - Coqueta.mp3",
            title: "Litos - Coqueta",
            cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
        }
    ];

    constructor() { }

    public getAudioList() {
        return this.audioList;
    }


    public getAudioById(id: string ) {
        return this.audioList.filter(data=> data.id == id );
    }
}
