import { Component, OnInit } from '@angular/core';
import {ExerciseService} from "./exercise.service";
import {ExerciseModel} from "./exercise-model";
import {ProgramService} from "../program/program.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise: ExerciseModel;
  subsrciption: Subscription;
  constructor(private programService: ProgramService) {

   this.programService.exerciseToShow.subscribe(
     (exercise: ExerciseModel) =>{

       this.exercise=exercise;
       console.log(this.exercise);
     }
   )

  }

  ngOnInit() {
this.programService.onProgramChosen.subscribe(
  () =>{
    this.exercise=null;
    }
)
  }

}
