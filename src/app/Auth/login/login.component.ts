import {Component, ElementRef, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    console.log(new Date())
  }

 onSubmit(form: NgForm){

/*console.log(form.controls['email'].value);
let userPwd =form.controls['password'].value;*/
this.authService.login(form.value.email,form.value.password);
/*  this.userService.login(form.controls['email'].value,form.controls['password'].value);
   if(this.userService.isAuthenticated){
  console.log("is authenticated");
     this.router.navigate(['../program']);
   }else{
     console.log("is not authenticated");
     this.router.navigate(['../login']);
   }*/

  }
}
