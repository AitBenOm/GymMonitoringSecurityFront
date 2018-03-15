import {EventEmitter, Injectable} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../user/user.model';

@Injectable()
export class AuthService {
  private _token: string = null;
  rememberMe: number = 0;
  userLoged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
  }

  register(user: UserModel) {
    return this.http.post('http://localhost:8080/Users/SingUp', user);

  }

  login(email: string, pwd: string) {
    //console.log(this.rememberMe);
    let user = JSON.stringify({email: email, pwd: pwd});

    let Myheaders = new HttpHeaders().set('rememberMe', this.rememberMe.toString());
//console.log(Myheaders.get("rememberMe"));
    return this.http.post('http://localhost:8080/login', user, {
      headers: Myheaders
    });

  }

  logout() {

    this._token = null;
    localStorage.removeItem('currentAthlete');
    this.router.navigate(['login']);
  }

  getHeaders(): HttpHeaders {
    let MyHeaders = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + this.getToken());
    return MyHeaders;
  }

  getToken() {
    return this._token;
  }

  setToken(value: string) {
    this._token = value;
  }

  isAuthenticated() {
    return this._token != null;
  }

}
