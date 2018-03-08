import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {UserModel} from "../../user/user.model";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService,) {
  }


  registerForm: FormGroup;
  newUser: UserModel;
  userExiste: boolean = true;

  ngOnInit() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'email': new FormControl(null, Validators.email),
      'pwdGroup': new FormGroup(
        {
          'pwd1': new FormControl('', Validators.minLength(6)),
          'pwd2': new FormControl('', Validators.minLength(6)),
        }, this.passwordMatchValidator.bind(this))
    });

  }

  passwordMatchValidator(g: FormGroup) {
    if (g.get('pwd1').value != g.get('pwd2').value) {
      return {'mismatch': true};
    }
    return null;
  }

  onRegister() {

    let Nuser = new UserModel(this.registerForm.get('firstName').value,
      this.registerForm.get('lastName').value, this.registerForm.get('email').value,
      this.registerForm.get('pwdGroup').get("pwd1").value);
    console.log(Nuser);
    this.authService.register(Nuser).subscribe(
      (user: UserModel) => {
        console.log(user);
        if (user === null) {
          this.userExiste = false;

        } else {
          console.log(user);
          this.router.navigate(['\login']);
        }
      }
    );

  }

}
