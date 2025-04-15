import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';

@Component({
  standalone: true,
  selector: 'app-edit-photos',
  templateUrl: './edit-photos.component.html',
  styleUrls: ['./edit-photos.component.scss'],
  imports: [CommonModule, FormsModule,]
})
export class EditPhotosComponent {

  @Input() photo !: string;
  @Input() nom !: string;
  cloudinaryUrl: string = '';

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  res = ""
  constructor(private userService: UserService) { }

  choiceMoyen = ""

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.photo = this.previewUrl as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.selectedFile && this.choiceMoyen == "file" && this.nom == "photos_profil") {
      // FormData pour l’envoi à une API backend
      const formData = new FormData();
      formData.append('image', this.selectedFile); // "image" = nom du champ dans le backend
      formData.append('userId', localStorage.getItem('userId')?.toString() as string); // "image" = nom du champ dans le backend
      // TODO : envoyer formData à ton API
      //console.log('Photo prête à être envoyée !', this.selectedFile.name);
      this.userService.editPhotoDeProfilViaFile(formData)
        .subscribe({
          next: (res) => {

            if (res.data == "Modification de photo de profil reussi") {
              this.res = "Modification de photo de profil réussi✅"
            } else
              this.res = "❌ Erreur lors de la modification de photo de profil"

            this.cloudinaryUrl = res.url;
          },
          error: (err) => {
            console.error('❌ Erreur lors de l’upload sécurisé', err);
          }
        });
    }

    if (this.selectedFile && this.choiceMoyen == "file" && this.nom == "photos_background") {
      // FormData pour l’envoi à une API backend
      const formData = new FormData();
      formData.append('image', this.selectedFile); // "image" = nom du champ dans le backend
      formData.append('userId', localStorage.getItem('userId')?.toString() as string); // "image" = nom du champ dans le backend
      // TODO : envoyer formData à ton API
      //  console.log('Photo prête à être envoyée !', this.selectedFile.name);
      this.userService.editPhotoDeBackgroundViaFile(formData)
        .subscribe({
          next: (res) => {

            if (res.data == "Modification de photo background reussi") {
              this.res = "Modification de photo de background réussi✅"
            } else
              this.res = "❌ Erreur lors de la modification de photo de background"

            this.cloudinaryUrl = res.url;
          },
          error: (err) => {
            console.error('❌ Erreur lors de l’upload sécurisé', err);
          }
        });
    }

    if (this.choiceMoyen == "link" && this.photo.trim()!="" && this.nom == "photos_profil") {
      this.userService.editPhotoDeProfilViaLink(localStorage.getItem("userId")?.toString() as string,
      this.photo)
        .subscribe({
          next: (res) => {

            if (res.data == "Modification de photo de profil reussi") {
              this.res = "Modification de photo de profil réussi✅"
            } else
              this.res = "❌ Erreur lors de la modification de photo de profil"

          },
          error: (err) => {
            console.error('❌ Erreur lors de la modification', err);
          }
        });
    }
    if (this.choiceMoyen == "link" && this.photo.trim()!="" && this.nom == "photos_background") {
      this.userService.editPhotoDeBackgroundViaLink(localStorage.getItem("userId")?.toString() as string,
      this.photo)
        .subscribe({
          next: (res) => {

            if (res.data == "Modification de photo background reussi") {
              this.res = "Modification de photo de background réussi✅"
            } else
              this.res = "❌ Erreur lors de la modification de photo de background"

          },
          error: (err) => {
            console.error('❌ Erreur lors de la modification', err);
          }
        });
    }
  }

}
