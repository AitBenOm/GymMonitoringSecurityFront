import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {AuthService} from "../Auth/auth.service";
import {JwtHelper} from "angular2-jwt";
import {UserModel} from "../user/user.model";
import {ProgramService} from "../program/program.service";
import {ProgramModel} from "../program/program-model";
import {RouterConfigLoader} from "@angular/router/src/router_config_loader";
import {Router} from "@angular/router";
import {ExerciseModel} from "../exercise/exercise-model";
import {ExerciseService} from "../exercise/exercise.service";
import {LoadsModel} from "../exercise/loads-model";
import {log} from "util";
import {HeaderService} from "./header.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DomSanitizer} from "@angular/platform-browser";
interface JsonImage{
  name: string;
  content: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[
    trigger('listShow', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0) '
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateY(-100px)'
        }),
        animate(500),
      ] ),
      transition('* => void', [
        animate(500, style({
          transform: 'translateY(100px) ',
          opacity:0

        })),
      ] )


    ]),
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private authServise: AuthService,
              private programService: ProgramService,
              private userService: UserService,
              private exerciseService: ExerciseService,
              private headerService: HeaderService,
              private sanitizer: DomSanitizer) {
  }

  isAuthenticated: boolean;
  token: string;
  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: UserModel;
    searchTopic: string = '';
  keyWord: string = '';
  errors: boolean = false;
  programs: ProgramModel[];
  exercises: ExerciseModel[];
  showDropDown:boolean=false;
  state= 'hiden';
  showOptions: boolean=false;
  avatar: any;
  private readonly imageType : string = 'data:image/PNG;base64,';



  ngOnInit() {
    this.userService.avatarChanged.subscribe(
      (data:any) => {
        this.avatar=data;
        console.log(" avatar changed header");
      }
    );
    this.userService.getFile().subscribe(
      (data: JsonImage) => {
        //  console.log(data.content);
        this.avatar = this.sanitizer.bypassSecurityTrustUrl(this.imageType+data.content);
      }
    );
    let id: number=0;
    this.token = this.authServise.getToken();
    if (this.token != null) {
      this.currentUser = this.jwtHelper.decodeToken(this.token).myUser;
      id=this.currentUser.idUser;
    }
    this.programService.onProgramsLoaded.subscribe(
      (programs: ProgramModel[]) => {
        this.programs = programs;
       // console.log("Programs " + this.programs.length);
      }
    );

    this.exerciseService.gerMyExercisesByUser(id).subscribe(
      (exercises: ExerciseModel[]) => {
       // console.log("Exercise by User "+exercises.length);
        this.exercises=exercises;

      }
    );

  }

  onLogout() {
    this.authServise.logout();
  }

  onSearchByExercise() {
   // console.log("exercise");
    this.errors=false;
    this.searchTopic = 'Exercise';
    this.headerService.onKewWordProgramChanged.emit('');
  }
  onShowDropDown(){
    if(!this.showDropDown){
      this.showDropDown=true;
    }else{
      this.showDropDown=true;
    }
  }

  onSearchByProgram() {
    this.errors=false;
    this.searchTopic = 'Program';
    this.headerService.onKewWordExerciseChanged.emit('');
  }

  onSearch() {
    if (this.searchTopic === '') {
      this.errors = true;
    } else {
      this.errors = false;
      if (this.searchTopic === 'Program') {

        this.headerService.onKewWordProgramChanged.emit(this.keyWord);

      } else {

        this.headerService.onKewWordExerciseChanged.emit(this.keyWord);
      }
    }
  }

  mouseIn(){
    this.showOptions=true;
    this.state = 'showen' ;
  }
  mouseOut(){

    this.state = 'hiden';
    this.showOptions=false;
  }
}
