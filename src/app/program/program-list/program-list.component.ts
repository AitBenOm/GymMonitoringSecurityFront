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
  constructor(private programService: ProgramService) { }

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
