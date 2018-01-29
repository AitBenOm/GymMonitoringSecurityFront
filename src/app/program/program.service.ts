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

  onProgramAdded= new EventEmitter<ProgramModel[]>();
  onProgramChosen= new EventEmitter<ProgramModel>();
  exerciseToShow = new EventEmitter<ExerciseModel>();

  getToDayString() {
    let toDay = new Date();
    let dd: any = toDay.getDay();
    let mm: any = toDay.getMonth() + 1;
    let yyyy: any = toDay.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return mm + '/' + dd + '/' + yyyy;
  }

  programs: ProgramModel[] = [

  ];

  getProgramById(id: number) {
    console.log("l'id du programme "+ id);
    console.log("le nombre de program "+ this.programs.length);
    console.log("la liste des programmes "+ this.programs);
    console.log("le programme "+ this.programs[id]);
    return this.programs[id];
  }

  showDetailExercise(exercise: ExerciseModel) {
    this.exerciseToShow.next(exercise);
  }
addProgram(program: ProgramModel){
    this.programs.push(program);
    //this.onProgramAdded.emit(this.programs);
  console.log(this.programs);
}

getPrograms(){
  return this.http.get("http://localhost:8080/Programs");
}
getMyPrograms(){
  return this.http.get("http://localhost:8080/MyPrograms?idUser=1");
}
}
