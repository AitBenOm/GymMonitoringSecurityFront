import {EventEmitter, Injectable} from '@angular/core';
import {ExerciseModel} from "./exercise-model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ExerciseService {

  constructor() { }
  exercise: ExerciseModel;
  onExerciseAdded= new Subject();

  addExercise(){

  }

gerExercise(){

}
}
