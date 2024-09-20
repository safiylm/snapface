import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service'
import * as bcrypt from "bcryptjs";


@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent {

  id: string = "";

  isDisplayPassword !: boolean;
  isDisplayPassword2 !: boolean;
  newpassword !: string;
  newpassword2 !: string;
  reglePasswordRespected !: boolean;
  is2PasswordIdentique !: boolean;

  passwordEditForm = new FormGroup({
    password: new FormControl(""),
    password2: new FormControl(""),
  });

  constructor(private route: ActivatedRoute, private userService: UserService) { }


  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }


  toggleDisplayPassword2() {
    this.isDisplayPassword2 = !this.isDisplayPassword2;
  }


  getFirstPassword(event: any) {
    this.newpassword = event.target.value;

    if (this.newpassword.length > 8 &&
      this.newpassword.match('[a-z]+') != null &&
      this.newpassword.match('[A-Z]+') != null &&
      this.newpassword.match('[0-9]+') != null &&
      this.newpassword.match('[!@#$%^&*]+') != null

    ) {
      this.reglePasswordRespected = true;
    } else {
      this.reglePasswordRespected = false;
    }
  }

  getSecondPassword(event: any) {
    this.newpassword2 = event.target.value;
    if (this.newpassword === this.newpassword2) {
      this.is2PasswordIdentique = true;
    } else {
      this.is2PasswordIdentique = false;
    }
  }



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.isDisplayPassword = false;
    this.isDisplayPassword2 = false;
    this.newpassword = "";
    this.newpassword2 = "";
    this.reglePasswordRespected = false;
    this.is2PasswordIdentique = false;
  }

  onSubmit() {
    const salt = bcrypt.genSaltSync(10);    
    if (this.newpassword === this.newpassword2) {
      this.newpassword = bcrypt.hashSync(this.newpassword, salt);
      this.userService.editPassword(this.id, this.newpassword);
    }
  }
}
