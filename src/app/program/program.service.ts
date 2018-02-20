import {EventEmitter, Injectable} from '@angular/core';
import {ProgramModel} from './program-model';

import {ExerciseModel} from '../exercise/exercise-model';
import {LoadsModel} from '../exercise/loads-model';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {headersToString} from "selenium-webdriver/http";
import {AuthService} from "../Auth/auth.service";
import {log} from "util";
import {UserService} from "../user/user.service";

@Injectable()
export class ProgramService {

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) {
  }

  onProgramAdded = new Subject<ProgramModel>();
  onProgramDeleted = new Subject<ProgramModel>();
  onProgramChosen = new Subject<ProgramModel>();
  onProgramChanged = new Subject<ProgramModel>();
  onProgramUpdated = new Subject<ProgramModel>();
  exerciseToShow = new Subject<ExerciseModel>();




  showDetailExercise(exercise: ExerciseModel) {
    this.exerciseToShow.next(exercise);
  }
addProgram(program: ProgramModel) {
console.log(program);
return this.http.post('http://localhost:8080/Programs/MyProgram' , program, {
  headers: this.authService.getHeaders()
});

}
updateProgram(program: ProgramModel) {
console.log(program);
return this.http.put('http://localhost:8080/Programs/MyProgram' , program, {
  headers: this.authService.getHeaders()
});

}
deleteProgram(program: ProgramModel) {
console.log(program);
return this.http.delete('http://localhost:8080/Programs/MyProgram/'+program.idProgram, {
  headers: this.authService.getHeaders()
});

}


getProgramById(idProgram: number) {
  return this.http.get('http://localhost:8080/Programs/MyProgram?idProgram=' + idProgram, {
    headers: this.authService.getHeaders()
  });
}


getMyPrograms(idUser: string) {

  return this.http.get('http://localhost:8080/Programs/MyPrograms?idUser='+idUser, {
    headers: this.authService.getHeaders()
  });
}

sortProgramsByLastModification(programs: ProgramModel[], order: string) {

  console.log(programs);
  programs.sort((prog1: ProgramModel, prog2: ProgramModel) => {
    if (order === 'name' || order=== '') {
      console.log("name");
      if (prog1.programName > prog2.programName) {
        return 1;
      }
      if (prog1.programName < prog2.programName) {
        return -1;
      } return 0;
    }
   if (order === 'modification') {
     console.log("modification");
     if (prog1.lastModification > prog2.lastModification) {
       return 1;
     }
     if (prog1.lastModification < prog2.lastModification) {
       return -1;
     } return 0;
   }
    if (order === 'creation') {
      console.log("reation");
      if (prog1.dateOfCreation > prog2.dateOfCreation) {
        return 1;
      }
      if (prog1.dateOfCreation < prog2.dateOfCreation) {
        return -1;
      } return 0;
    }
  });
  console.log(programs);
  return programs;
}
}
