import {Component, ElementRef, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {JwtHelper} from "angular2-jwt";
import {UserModel} from "../../user/user.model";


interface authToken {
  token: string;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

isRegistred: boolean=true;

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    // console.log(form.value.rememberMe);
    if (form.value.rememberMe) {
      this.authService.rememberMe = 365;
    }
    this.authService.login(form.value.email, form.value.password).subscribe(
      (token: authToken) => {
        console.log(token);

        localStorage.setItem('currentAthlete', token.token);
        this.authService.setToken(token.token);
        this.router.navigate(['../program']);
        this.authService.userLoged.emit(true);
      }, error2 => {
        console.log('my error');
        this.isRegistred= false;
      }
    );

  }
}
