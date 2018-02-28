import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  constructor(private userService: UserService) { }
  user: UserModel;
  imageProfil: Blob;
  ngOnInit() {
    this.user=this.userService.getUserFromToken();
  }
  show(){
    console.log(this.imageProfil);
  }

}
