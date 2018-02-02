import { Component, OnInit } from '@angular/core';
import {ExerciseService} from "./exercise.service";
import {ExerciseModel} from "./exercise-model";
import {ProgramService} from "../program/program.service";
import {Subscription} from "rxjs/Subscription";
import {LoadsModel} from './loads-model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise: ExerciseModel;
  showForm: boolean=false;
  showOption: boolean = false;

  constructor(private programService: ProgramService, private exerciseService: ExerciseService) {
    this.programService.onProgramChanged.subscribe(
      (data)=> {
        this.exercise = null;
      }
    );
  }



  ngOnInit() {
    this.programService.exerciseToShow.subscribe(
      (exercise: ExerciseModel) =>{
// console.log(exercise);
        this.exercise = exercise;

      }
    );
    this.exerciseService.onExerciseAdded.subscribe(
      (data: ExerciseModel) => {
        // console.log(data);
      }
    );
this.exerciseService.onLoadAdded.subscribe(
  (data: LoadsModel) => {
    this.exercise.charges.push(data);
  }
);
this.exerciseService.onProgramLoaded.subscribe(
  () =>{
    // console.log(this.exercise!=null);
    this.exercise=null;
    }
);
  }


  onShowForm() {
    if (this.showForm === false ) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }
  onShowOption(){
    if (this.showOption === false ) {
      this.showOption = true;
    } else {
      this.showOption = false;
    }
  }

}
