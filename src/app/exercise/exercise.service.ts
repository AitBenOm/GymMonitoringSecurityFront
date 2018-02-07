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
  onExerciseAdded= new Subject <ExerciseModel>();
  onExerciseUpdated= new Subject<ExerciseModel>();
  onProgramLoaded = new Subject<null>();
  onLoadUpdated= new Subject<LoadsModel>();
  onLoadAdded= new Subject<LoadsModel>();
  onLoadDeleted= new Subject<null>();



gerMyExercise(idProgram: number){
return this.http.get("http://localhost:8080/MyExercises?idProgram="+idProgram);
}
gerMyLoads(idExercise: number){
return this.http.get("http://localhost:8080/MyLoads?idExercise="+idExercise);
}
getExerciseById(idExercise: number){
return this.http.get("http://localhost:8080/MyExercises/"+idExercise);
}
gerLoadById(idLoad: number){
return this.http.get("http://localhost:8080/MyLoad/"+idLoad);
}

  addExercise(exercise: ExerciseModel, programId: string){
    console.log(programId);
    const idProgram = programId;
    console.log(exercise);
    return this.http.post("http://localhost:8080/MyExercise" , exercise, {
      params : new HttpParams().set('idProgram', idProgram)
    } );

  }

  updateLoad(load: LoadsModel){
    return this.http.put("http://localhost:8080/MyLoad", load);
  }

  updateExercise(exercise: ExerciseModel){
    return this.http.put("http://localhost:8080/MyExercise", exercise);
  }
  deleteLoad(idLoad: number){
    return this.http.delete("http://localhost:8080/MyLoads/" + idLoad);
  }
  deleteExercise(exercise: ExerciseModel){
    return this.http.delete("http://localhost:8080/MyExercises/" + exercise.idExercise);
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
