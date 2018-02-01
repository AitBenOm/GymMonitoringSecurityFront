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
  subsrciption: Subscription;
  constructor(private programService: ProgramService, private exerciseService: ExerciseService) {

   this.programService.exerciseToShow.subscribe(
     (exercise: ExerciseModel) =>{

       this.exercise=exercise;

     }
   );

  }

  ngOnInit() {
    this.exerciseService.onExerciseAdded.subscribe(
      (data: ExerciseModel) => {
        console.log(data);
      }
    );
this.exerciseService.onLoadAdded.subscribe(
  (data: LoadsModel) => {
    this.exercise.charges.push(data);
  }
);
this.programService.onProgramChosen.subscribe(
  () =>{
    this.exercise=null;
    }
)
  }

}
