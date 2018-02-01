import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../program.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProgramModel} from '../program-model';
import {ExerciseModel} from '../../exercise/exercise-model';
import {ExerciseService} from '../../exercise/exercise.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {LoadsModel} from "../../exercise/loads-model";

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  id: number;
  program: ProgramModel;
  exercises: ExerciseModel[];





  constructor(private programService: ProgramService,
              private exerciseService: ExerciseService,
              private route: ActivatedRoute,

             ) {}

  ngOnInit() {
    this.exerciseService.onExerciseAdded.subscribe(
      (data: ExerciseModel) => {
       this.exercises.push(data);
      }
    );
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
           this.programService.getProgramById(this.id).subscribe(
            (data: ProgramModel)=> {
              console.log(data);
              this.programService.onProgramChosen.next(data);
              this.program = data;
            }
          );

         this.exerciseService.gerMyExercise(this.id).subscribe(
           (data: ExerciseModel[]) => {
             this.exercises = data;
             for ( const exercise of this.exercises){
               this.exerciseService.gerMyLoads(exercise.idExercise).subscribe(
                 (loads: LoadsModel[]) => {
                   exercise.charges= loads;
                 }
               );
               }
           }
         );

          this.programService.exerciseToShow.next(null);
        }
      );
/*this.subscription= this.exerciseService.onExerciseAdded.subscribe(
  (exercises: ExerciseModel[])=>{
    this.program.exercises.push(exercises[exercises.length-1]);
  }
)*/

  }
  onShowDetail(exercise: ExerciseModel) {
    console.log('program-detail ' + exercise.exerciseName);
   this.programService.showDetailExercise(exercise);
  }

}
