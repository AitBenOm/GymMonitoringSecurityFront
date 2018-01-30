import {EventEmitter, Injectable} from '@angular/core';
import {ExerciseModel} from "./exercise-model";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ExerciseService {

  constructor(private htpp: HttpClient) { }
  exercise: ExerciseModel;
  onExerciseAdded= new Subject();


  addExercise(){

  }

gerMyExercise(idProgram: number){
return this.htpp.get("http://localhost:8080/MyExercises?idProgram="+idProgram);
}
gerMyLoads(idExercise: number){
return this.htpp.get("http://localhost:8080/MyLoads?idExercise="+idExercise);
}

  showDetailExercise(exercise: ExerciseModel) {
    this.exerciseToShow.next(exercise);
  }
}
