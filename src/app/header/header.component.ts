import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {AuthService} from "../Auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private authServise: AuthService) { }
isAuthenticated: boolean;
  ngOnInit() {
/*console.log(this.authServise.isAuthenticated());
    this.isAuthenticated=this.authServise.isAuthenticated();*/

  }
  onLogout(){
    this.authServise.logout();
  }

}
