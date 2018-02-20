import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../program.service";
import {ProgramModel} from "../program-model";
import {UserService} from "../../user/user.service";
import {UserModel} from "../../user/user.model";

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']

})
export class ProgramListComponent implements OnInit {

  programs: ProgramModel[];
  user: UserModel;
  constructor(private programService: ProgramService, private userService:UserService) {
    this.user=(this.userService.getUserFromToken());
  }

  ngOnInit() {
console.log(this.user.email);
    this.programService.getMyPrograms(this.user.idUser.toString()).subscribe(
      (data: ProgramModel[]) =>{
        console.log(this.programService.sortProgramsByLastModification(data, ''));
        console.log("************************");
        data.sort();
        console.log(data);
     this.programs = data;
   }
    );

    this.programService.onProgramAdded.subscribe(
    (program: ProgramModel) => {
      this.programs.push(program);
    }
    );
    this.programService.onProgramUpdated.subscribe(
      (programData) =>{
        let n = 0;
        console.log("*************************");
        for ( const program of this.programs){
            if ( program.idProgram === programData.idProgram){
              break;
            }
            n++;
        }
        console.log(this.programs);
        this.programs.splice(n,1);
        this.programs.push(programData);
        this.programs=this.programService.sortProgramsByLastModification(this.programs, '');
        console.log(programData);
        console.log(programData + " Index " + n);
      }
    );
  /* this.programs=this.programService.onProgramAdded.subscribe(
     (programs: ProgramModel[])=>{
       this.programs=programs;
     }
   );*/

  }

  onShowDetail(id: number){
    console.log(id)
  }

}
