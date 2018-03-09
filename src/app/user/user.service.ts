import {Injectable} from '@angular/core';
import {UserModel} from "./user.model";
import {JwtHelper} from "angular2-jwt";
import {AuthService} from "../Auth/auth.service";
import {Router} from '@angular/router';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  isAuthenticated: boolean = false;
  user: UserModel;
  avatarChanged = new Subject<any>();
  test: Observable<string>;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  jwtHelper: JwtHelper = new JwtHelper();


  getUserFromToken() {
    if (this.authService.getToken() != null) {
      this.user = this.jwtHelper.decodeToken(this.authService.getToken()).myUser;
      console.log(this.user);
      return this.user;
    } else {
      return null;
    }

  }

  getImage(idProgram: number) {
    console.log('getimage');
    return this.http.get('http://localhost:8080/Programs/imgProfil?id=' + idProgram, {
      headers: this.authService.getHeaders()
    });
  }

  //
  // saveFile(formData: FormData) {
  //   return this.http.post('http://localhost:8080/Users/upload?file=' + formData, {
  //     headers: this.authService.getHeaders()
  //     // .set('Content-Type','image/png')
  //   });
  // }

  saveFile(file: File) {
    let formdata: FormData = new FormData();
    const MyHeaders = new HttpHeaders();

    formdata.append('file', file);
    return this.http.post('http://localhost:8080/Users/saveFile/' + this.getUserFromToken().idUser, formdata, {
      headers: MyHeaders.set('authorization', 'Bearer ' + this.authService.getToken()),
      reportProgress: true,
      responseType: 'text'

    });

  }

  getFile() {
    if (this.getUserFromToken() != null) {
      const MyHeaders = new HttpHeaders();
      return this.http.get("http://localhost:8080/Users/getImage/" + this.getUserFromToken().idUser, {
        headers: MyHeaders.set('authorization', 'Bearer ' + this.authService.getToken()),
      });
    }

  }
}
