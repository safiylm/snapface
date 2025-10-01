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
  post: Publication | null | undefined;

  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<string>();


  constructor(private chatService: ChatPriveService,
    private postService: PublicationsService
  ) { }


  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur


    this.chatService.getPrivateMessagesWithSocket().subscribe(msg => {
      if (this.message._id == msg.messageId)
        this.message = msg;
    });


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


  delete(id: string) {
    this.displayEditDeleteButton = false

    //   if (localStorage.getItem("userId") == this.conversation.speaker[0])
    //     this.chatService.edit(this.sender, this.conversation.speaker[1], this.messageEdittingId, this.message)
    //   else
    //     this.chatService.edit(this.sender, this.conversation.speaker[0], this.messageEdittingId, this.message)
    //   this.message = '';
    // }
    // this.chatService.delete(id).subscribe({
    //   next: (data) => {
    //     if (data) {
    //      this.deleteEvent.emit('supp')
    //     }
    //   }, error: e => {
    //     console.error('erreur, delete message', e)
    //   }
    // })

  }
}
