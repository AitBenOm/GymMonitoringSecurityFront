import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {UserModel} from "../../user/user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }


  registerForm: FormGroup;
  newUser: UserModel;

  ngOnInit() {
    this.registerForm= new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'email': new FormControl(null, Validators.email),
      'pwdGroup': new FormGroup(
        {
          'pwd1': new FormControl('',Validators.minLength(6)),
          'pwd2': new FormControl('',Validators.minLength(6)),
        }, this.passwordMatchValidator.bind(this))
    });
    console.log(this.registerForm);
  }
  passwordMatchValidator(g: FormGroup) {
    if(g.get('pwd1').value != g.get('pwd2').value){
      return {'mismatch': true};
    }return  null ;
  }
  onRegister(){
    console.log("Registering User");
console.log(this.registerForm);

  /*this.userService.addUser(new UserModel(this.userService.users.length+1,this.registerForm.get('firstName').value,
    this.registerForm.get('lastName').value,this.registerForm.get('email').value,
    this.registerForm.get('pwdGroup').get("pwd1").value));*/
this.newUser= new UserModel(this.userService.users.length+1,this.registerForm.get('firstName').value,
    this.registerForm.get('lastName').value,this.registerForm.get('email').value,
    this.registerForm.get('pwdGroup').get("pwd1").value);
    this.authService.register(this.newUser.email, this.newUser.pwd);
this.registerForm.reset();
  }

}
