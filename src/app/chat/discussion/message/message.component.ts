import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation } from 'src/models/conversation';
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
  @Input() conversation!: Conversation;

  messageEdittingId = "";
  message_ = "" ;
  sender = "";
  displayEditDeleteButton = false
  post: Publication | null | undefined;

  @Output() editEvent = new EventEmitter<any>();

  constructor(private chatService: ChatPriveService,
    private postService: PublicationsService
  ) { }


  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

    this.chatService.joinRoom(this.conversation._id)

    if (this.message.postId != "") { //important sinon backend failed 

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


  sendValueForEdittingMessage(text: string, id: string) {
    this.editEvent.emit({ 'id': id, "text": text });
    this.displayEditDeleteButton = false
  }

  openPost(id: string)
{
  document.location.href='post/'+id
}
  delete() {
    this.displayEditDeleteButton = false

    const receiver = (this.sender === this.conversation.speaker[0])
      ? this.conversation.speaker[1]
      : this.conversation.speaker[0];

    this.chatService.delete(this.sender, receiver, this.message._id, this.conversation._id)
  }
  
}
