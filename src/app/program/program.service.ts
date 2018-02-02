import {EventEmitter, Injectable} from '@angular/core';
import {ProgramModel} from "./program-model";

import {ExerciseModel} from "../exercise/exercise-model";
import {LoadsModel} from "../exercise/loads-model";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProgramService {

  constructor(private http: HttpClient) {
  }

  onProgramAdded= new EventEmitter<ProgramModel>();
  onProgramChosen= new EventEmitter<ProgramModel>();
  onProgramChanged= new EventEmitter<ProgramModel>();
  exerciseToShow = new EventEmitter<ExerciseModel>();




  showDetailExercise(exercise: ExerciseModel) {
    this.exerciseToShow.next(exercise);
  }
addProgram(program: ProgramModel){
console.log(program);
return this.http.post("http://localhost:8080/MyProgram" , program);

}

getPrograms(){
  return this.http.get("http://localhost:8080/Programs");
}

getProgramById(idProgram: number){
  return this.http.get("http://localhost:8080/MyProgram?idProgram="+ idProgram);
}


getMyPrograms(){
  return this.http.get("http://localhost:8080/MyPrograms?idUser=1");
}
}
