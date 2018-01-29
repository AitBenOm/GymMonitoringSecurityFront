import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
firebase.initializeApp({
  apiKey: "AIzaSyC2pAckrLKe5gyQuG6N7pBvbQcRE9SQN00",
  authDomain: "gymmonitor-507c4.firebaseapp.com",
});

  }
  title = 'app';
}
