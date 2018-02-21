import {Component, OnInit} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {AuthService} from "./Auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

jwtHelper : JwtHelper= new JwtHelper();
  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
if(localStorage.getItem("currentAthlete")!=null){
  if(!this.jwtHelper.isTokenExpired(localStorage.getItem("currentAthlete"))){
    this.authService.setToken(localStorage.getItem("currentAthlete"));
  }
}

  }
  title = 'app';
}
