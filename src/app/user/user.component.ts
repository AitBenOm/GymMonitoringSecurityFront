import { Component, OnInit } from '@angular/core';
import {UserModel} from './user.model';
import {UserService} from './user.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations:[
    trigger('userShow', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0) '
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateX(-100px)'
        }),
        animate(300),
      ] ),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px) ',
          opacity:0

        })),
      ] )


    ]),
  ]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
