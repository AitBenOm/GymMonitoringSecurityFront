import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class AuthService {
token: string=null;

  constructor(private router: Router, private route: ActivatedRoute ) { }

  register(email: string, pwd: string){
firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(
  error => console.log(error)
)  }

login(email: string, pwd: string){
    firebase.auth().signInWithEmailAndPassword(email,pwd).then(
      (response: Response)=>{
        this.router.navigate(['program']);
        firebase.auth().currentUser.getToken()
          .then(
            (token: string)=>{
              this.token= token;
           //   console.log("My Token "+ this.token);
              localStorage.setItem('currentUser',this.token);
            }
          );

        console.log(response);
      }
    ).catch(
      error=>console.log(error)
    );
}

logout(){
  firebase.auth().signOut();
  this.token=null;
  this.router.navigate(['login']);
}

getToken(){
 firebase.auth().currentUser.getToken().then(
   (token:string)=>{
     this.token=token;
   }
 );
 return this.token;
}

isAuthenticated(){

  /*let localStorageSession= localStorage['currentUser'];
console.log("CurrentUser "+ localStorageSession);
let tokenTest=null;
  firebase.auth().currentUser.getToken()
    .then(
      (token: string)=>{
        tokenTest= token;
        //   console.log("My Token "+ this.token);
      }
    );
  console.log("My Token "+ tokenTest);
  console.log(tokenTest === localStorage.getItem('currentUser'));
  return this.token === localStorage.getItem('currentUser');*/
  return this.token!=null;
}

}
