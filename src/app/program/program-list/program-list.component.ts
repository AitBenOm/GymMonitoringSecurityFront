import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../program.service";
import {ProgramModel} from "../program-model";

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']

})
export class ProgramListComponent implements OnInit {

  programs: ProgramModel[];
  constructor(private programService: ProgramService) {

  }

  ngOnInit() {

    this.programService.getMyPrograms().subscribe(
      (data: ProgramModel[]) =>{
     this.programs = data;
   }
    );
//    this.programs=this.programService.programs;
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
        console.log(this.programs.push(programData));
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
