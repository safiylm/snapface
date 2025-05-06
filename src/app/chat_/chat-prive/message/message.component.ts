import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/models/message.model';
import { Publication } from 'src/models/publication.model';
import { ChatPriveService } from 'src/services/chatprive.service';
import { PublicationsService } from 'src/services/publication-service';

@Component({
  standalone: true,
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [NgClass, NgIf]
})
export class MessageComponent {

  @Input() message!: Message;
  messageEdittingId = "";
  message_ = "";
  sender = "";
  displayEditDeleteButton = false
  post : Publication | null | undefined;
  
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  

  constructor(private chatService: ChatPriveService, private postService: PublicationsService
  ) { }

  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur
   if( //this.message.postId!= "" || 
    this.message.postId!= undefined
   //   || this.message.postId!= null
    ){
      console.log("fcvgbhnj")
      this.postService.getPublicationById(this.message.postId as string).subscribe(
        {
          next: (data) => {
            if (data) {
             this.post = data
            }
          }, error: e => {
           console.error("Erreur: chargement du post sended,", e)
          }
        })
    }
  }

  showEdit(text: string, id: string) {
    this.editEvent.emit(id + "-" + text);
  }


  delete(id: string) {
    this.chatService.deleteMessage(id).subscribe({
      next: (data) => {
        if (data) {
         this.deleteEvent.emit('supp')
        }
      }, error: e => {
        console.error('erreur, delete message', e)
      }
    })

  }
}
