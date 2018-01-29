import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../program.service";
import {ProgramModel} from "../program-model";
import {ExerciseModel} from "../../exercise/exercise-model";
import {LoadsModel} from "../../exercise/loads-model";

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {

  constructor(private programService: ProgramService) { }
  programTitle: string='';
  exerciseTitle: string='';
  load: string='';

  programAdded: boolean=false;
  exerciseAdded: boolean=false;
  onExerciseAdded: boolean=true;

  program: ProgramModel;
  exercise: ExerciseModel;
  exercises: ExerciseModel[]=[

  ];
  ngOnInit() {
  }

  getToDayString(){
    let toDay = new Date();
    let dd: any = toDay.getDay();
    let mm: any= toDay.getMonth()+1;
    let yyyy: any= toDay.getFullYear();

    if(dd<10){
      dd='0'+dd;
    }
    if (mm<10){
      mm='0'+mm;
    }
console.log( mm+'/'+dd+'/'+yyyy);
    return mm+'/'+dd+'/'+yyyy;
  }
  onAddProgram(){
    this.programAdded=true;

  }
  onAddExercise(){
    this.exerciseAdded=true;
  }
onSaveProgram (){
    let nbPrograms= this.programService.programs.length;
  this.programService.addProgram(
    new ProgramModel(nbPrograms+1, this.programTitle, this.getToDayString(), this.getToDayString(), [new ExerciseModel(1, this.exerciseTitle, [
      new LoadsModel(1, this.load, this.getToDayString())])
    ])
  );
  this.programTitle='';
  this.load='';
  this.exerciseTitle='';

  this.programAdded=false;
  this.exerciseAdded=false;
  }
}
