import { Injectable } from '@angular/core';
import {UserModel} from "./user.model";
import {JwtHelper} from "angular2-jwt";
import {AuthService} from "../Auth/auth.service";
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  isAuthenticated: boolean= false;

   user : UserModel;
  constructor(private http: HttpClient, private authService: AuthService,  private router: Router) {
  }

  jwtHelper: JwtHelper = new JwtHelper();


getUserFromToken(){

    this.user=this.jwtHelper.decodeToken( this.authService.getToken()).myUser;
    console.log(this.user);
    return this.user;
}
  getImage(idProgram: number) {
  console.log('getimage');
    return this.http.get('http://localhost:8080/Programs/imgProfil?id=' + idProgram, {
      headers: this.authService.getHeaders()
    });
  }
}
