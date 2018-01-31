import {EventEmitter, Injectable} from '@angular/core';
import {ExerciseModel} from "./exercise-model";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProgramModel} from "../program/program-model";
import {LoadsModel} from "./loads-model";

@Injectable()
export class ExerciseService {

  constructor(private http: HttpClient) { }
  exercise: ExerciseModel;
  onExerciseAdded= new Subject();



gerMyExercise(idProgram: number){
return this.http.get("http://localhost:8080/MyExercises?idProgram="+idProgram);
}
gerMyLoads(idExercise: number){
return this.http.get("http://localhost:8080/MyLoads?idExercise="+idExercise);
}

  addExercise(exercise: ExerciseModel, programId: string){
    console.log(programId);
    const idProgram = programId;
    console.log(exercise);
    return this.http.post("http://localhost:8080/MyExercise" , exercise, {
      params : new HttpParams().set('idProgram', idProgram)
    } );

  }

  addLoad(load: LoadsModel, exerciseId: string){
        const idExercise = exerciseId;
        return this.http.post("http://localhost:8080/MyLoad" , load, {
      params : new HttpParams().set('idExercise', idExercise)
    } );

  }


  // showDetailExercise(exercise: ExerciseModel) {
  //   this.exerciseToShow.next(exercise);
  // }
}
