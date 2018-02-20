import { Injectable } from '@angular/core';
import {UserModel} from "./user.model";
import {JwtHelper} from "angular2-jwt";
import {AuthService} from "../Auth/auth.service";

@Injectable()
export class UserService {

  isAuthenticated: boolean= false;

   user : UserModel;
  constructor(private authService: AuthService) { }
  jwtHelper: JwtHelper = new JwtHelper();


getUserFromToken(){

    this.user=this.jwtHelper.decodeToken( this.authService.getToken()).myUser;
    console.log(this.user);
    return this.user;
}
}
