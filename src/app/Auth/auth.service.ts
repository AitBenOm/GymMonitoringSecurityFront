import { Injectable } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {
private _token: string=null;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient ) { }

  register(email: string, pwd: string){

  }

login(email: string, pwd: string){
  let user =JSON.stringify({ email: email, pwd: pwd });

  let headers= new HttpHeaders();
  headers.append('responseType', '*');

   return this.http.post("http://localhost:8080/login",user);

}

logout(){

  this._token=null;
  this.router.navigate(['login']);
}

  getHeaders(): HttpHeaders {
    let MyHeaders = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + this.getToken());
    return MyHeaders;
  }

  getToken(){
  return this._token;
  }

  setToken(value: string) {
    this._token = value;
  }

  isAuthenticated(){
  return this._token!=null;
}

}
