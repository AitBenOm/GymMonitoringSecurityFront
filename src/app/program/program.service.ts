import {EventEmitter, Injectable} from '@angular/core';
import {ProgramModel} from './program-model';

import {ExerciseModel} from '../exercise/exercise-model';
import {LoadsModel} from '../exercise/loads-model';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProgramService {

  constructor(private http: HttpClient) {
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
return this.http.post('http://localhost:8080/Programs/Myprogram' , program);

}
updateProgram(program: ProgramModel) {
console.log(program);
return this.http.put('http://localhost:8080/Programs/Myprogram' , program);

}
deleteProgram(program: ProgramModel) {
console.log(program);
return this.http.delete('http://localhost:8080/Programs/Myprogram/'+program.idProgram);

}


getProgramById(idProgram: number) {
  return this.http.get('http://localhost:8080/Programs/Myprogram?idProgram=' + idProgram);
}


getMyPrograms() {
  return this.http.get('http://localhost:8080/Programs/Myprograms?idUser=1');
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
