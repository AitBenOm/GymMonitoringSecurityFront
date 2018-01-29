import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../program.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProgramModel} from "../program-model";
import {ExerciseModel} from "../../exercise/exercise-model";
import {ExerciseService} from "../../exercise/exercise.service";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  id: number;
  program: ProgramModel;

  showDetail: boolean = false;
subscription: Subscription;


  constructor(private programService: ProgramService,
              private exerciseService: ExerciseService,
              private route: ActivatedRoute,

             ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.program = this.programService.getProgramById(this.id);

          this.programService.exerciseToShow.next(null);
        }
      );
/*this.subscription= this.exerciseService.onExerciseAdded.subscribe(
  (exercises: ExerciseModel[])=>{
    this.program.exercises.push(exercises[exercises.length-1]);
  }
)*/


  }
  onShowDetail(exercise:ExerciseModel){
    console.log("program-detail "+exercise.name);
   this.programService.showDetailExercise(exercise);
  }

}
