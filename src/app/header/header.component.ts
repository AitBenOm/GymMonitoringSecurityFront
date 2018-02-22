import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {AuthService} from "../Auth/auth.service";
import {JwtHelper} from "angular2-jwt";
import {UserModel} from "../user/user.model";
import {ProgramService} from "../program/program.service";
import {ProgramModel} from "../program/program-model";
import {RouterConfigLoader} from "@angular/router/src/router_config_loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private authServise: AuthService, private programService: ProgramService,private router: Router) { }
isAuthenticated: boolean;
  token: string;
  jwtHelper: JwtHelper= new JwtHelper();
  currentUser: UserModel;
  imagePath: string =' assets/muscles.png';
  searchTopic: string='';
  errors: boolean=false;
  programFounded: boolean=false;
  programs: ProgramModel[];


  ngOnInit() {
this.token= this.authServise.getToken();
if(this.token!=null){
  this.currentUser= this.jwtHelper.decodeToken(this.token).myUser;
}
this.programService.onProgramsLoaded.subscribe(
  (programs: ProgramModel[]) => {
    this.programs=programs;
    console.log("Programs "+ this.programs.length);
  }
);

  }
  onLogout(){
    this.authServise.logout();
  }

  onSearchByExercise(){
    console.log("exercise");
    this.searchTopic='Exercise';
  }
  onSearchByProgram(){
    console.log("program");
    this.searchTopic='Program';
  }
onSearch(keyWord: string){
    let idProgrme: number=0;
  console.log(keyWord);
  console.log(this.searchTopic);
    if(this.searchTopic==='' || keyWord===''){
     this.errors=true;
    }else {
      this.errors=false;
      for ( const program of this.programs){
        if ( program.programName === keyWord){

          this.router.navigate(['/program',program.idProgram]);
          keyWord='';
          this.searchTopic='';
          break;
        }else{
          this.programFounded=false;
        }

      }
    }

}
}
