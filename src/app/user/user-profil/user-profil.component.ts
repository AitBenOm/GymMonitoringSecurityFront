import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  constructor(private userService: UserService) { }
  user: UserModel;
  ngOnInit() {
    this.user=this.userService.getUserFromToken();
  }

}
