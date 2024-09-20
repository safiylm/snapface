import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service'


@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent {

  id: string = "";
  passwordEditForm = new FormGroup({
    password: new FormControl(""),
  });


  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  onSubmit() {
    const newpassword = this.passwordEditForm.controls['password'].value as string
    console.log( newpassword)
    this.userService.editPassword(this.id, newpassword);
  }
}
