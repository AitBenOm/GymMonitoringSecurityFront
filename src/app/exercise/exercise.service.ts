import {EventEmitter, Injectable} from '@angular/core';
import {ExerciseModel} from "./exercise-model";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProgramModel} from "../program/program-model";
import {LoadsModel} from "./loads-model";
import {AuthService} from "../Auth/auth.service";

@Injectable()
export class ExerciseService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  exercise: ExerciseModel;
  onExerciseAdded= new Subject <ExerciseModel>();
  onExerciseUpdated= new Subject<ExerciseModel>();
  onProgramLoaded = new Subject<null>();
  onLoadUpdated= new Subject<LoadsModel>();
  onLoadAdded= new Subject<LoadsModel>();
  onLoadDeleted= new Subject<null>();



gerMyExercise(idProgram: number){
return this.http.get("http://localhost:8080/Exercises/MyExercises?idProgram="+idProgram, {
  headers: this.authService.getHeaders()
});
}

gerMyExercisesByUser(idUser: number){
return this.http.get("http://localhost:8080/Exercises/MyExercises/user?idUser="+idUser, {
  headers: this.authService.getHeaders()
});
}
gerMyLoads(idExercise: number){
return this.http.get("http://localhost:8080/Loads/MyLoads?idExercise="+idExercise, {
  headers: this.authService.getHeaders()
});
}
getExerciseById(idExercise: number){
return this.http.get("http://localhost:8080/Exercises/MyExercises/"+idExercise, {
  headers: this.authService.getHeaders()
});
}
gerLoadById(idLoad: number){
return this.http.get("http://localhost:8080/Loads/MyLoads/"+idLoad, {
  headers: this.authService.getHeaders()
});
}

gerLoadsByUser(idUser: number){
return this.http.get("http://localhost:8080/Loads/MyLoads/user?idUser="+idUser, {
  headers: this.authService.getHeaders()
});
}

  addExercise(exercise: ExerciseModel, programId: string){
    console.log(programId);
    const idProgram = programId;
    console.log(exercise);
    return this.http.post("http://localhost:8080/Exercises/MyExercise" , exercise, {
      params : new HttpParams().set('idProgram', idProgram), headers: this.authService.getHeaders()
    } );

  }

  updateLoad(load: LoadsModel){
    return this.http.put("http://localhost:8080/Loads/MyLoad", load, {
      headers: this.authService.getHeaders()
    });
  }

  updateExercise(exercise: ExerciseModel){
    return this.http.put("http://localhost:8080/Exercises/MyExercise", exercise, {
      headers: this.authService.getHeaders()
    });
  }
  deleteLoad(idLoad: number){
    return this.http.delete("http://localhost:8080/Loads/MyLoads/" + idLoad, {
      headers: this.authService.getHeaders()
    });
  }
  deleteExercise(exercise: ExerciseModel){
    return this.http.delete("http://localhost:8080/Exercises/MyExercises/" + exercise.idExercise, {
      headers: this.authService.getHeaders()
    });
  }

  addLoad(load: LoadsModel, exerciseId: string){
        const idExercise = exerciseId;
        return this.http.post("http://localhost:8080/Loads/MyLoad" , load, {
      params : new HttpParams().set('idExercise', idExercise), headers: this.authService.getHeaders()
    } );

  }


  // showDetailExercise(exercise: ExerciseModel) {
  //   this.exerciseToShow.next(exercise);
  // }
}
