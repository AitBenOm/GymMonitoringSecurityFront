import { Injectable } from '@angular/core';
import {UserModel} from "./user.model";
import index from "@angular/cli/lib/cli";

@Injectable()
export class UserService {

  isAuthenticated: boolean= false;

  users: UserModel[]=[
    new UserModel(1,'Omar', 'Ait Benaissa', 'omar.benaissa@outlook.com', 'azerty123'),
    new UserModel(2,'Chaimae', 'Rhallab', 'rhallabchaimae9@gmail.com', 'azerty123'),
  ];
  constructor() { }
addUser(user: UserModel){
    this.users.push(user);

    for(let user of this.users){
      console.log(user.firstName);
  }
}
login(email: string, pwd: string){
let id:number=null;
  for(let user of this.users){
  if(user.email=== email && user.pwd===pwd){
    console.log(user.email+"  "+user.pwd);
    this.isAuthenticated= true;
    id=user.id;
    //break;
  }
   }
  return id;
}
}
