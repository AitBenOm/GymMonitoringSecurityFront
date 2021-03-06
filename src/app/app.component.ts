import {Component, OnInit} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {AuthService} from "./Auth/auth.service";

import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from './user/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('listShow', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void =>*', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService, private userService: UserService) {
  }

  private sanitizer: DomSanitizer;
  image: any;
  private readonly imageType: string = 'data:image/JPG;base64,';

  getImage() {
  }

  ngOnInit(): void {
    console.log('image load');

    if (localStorage.getItem("currentAthlete") != null) {
      if (!this.jwtHelper.isTokenExpired(localStorage.getItem("currentAthlete"))) {
        this.authService.setToken(localStorage.getItem("currentAthlete"));
      }
    }

  }

  title = 'app';
}
