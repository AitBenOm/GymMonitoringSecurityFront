import {Component, EventEmitter, OnInit} from '@angular/core';
import {ExerciseService} from "./exercise.service";
import {ExerciseModel} from "./exercise-model";
import {ProgramService} from "../program/program.service";
import {Subscription} from "rxjs/Subscription";
import {LoadsModel} from './loads-model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise: ExerciseModel;
  showOption: boolean = false;
  loadToUpdate: LoadsModel=null;
  updateMode: boolean;


  constructor(private programService: ProgramService, private exerciseService: ExerciseService) {
    this.programService.onProgramChanged.subscribe(
      (data)=> {
        this.exercise = null;
        this.updateMode=false;
        this.loadToUpdate=null;
      }
    );
  }



  ngOnInit() {
    this.programService.exerciseToShow.subscribe(
      (exercise: ExerciseModel) =>{
// console.log(exercise);
        this.exercise = exercise;

      }
    );
    this.exerciseService.onExerciseAdded.subscribe(
      (data: ExerciseModel) => {
        // console.log(data);
      }
    );

this.exerciseService.onLoadAdded.subscribe(
  (data: LoadsModel) => {
    this.exercise.charges.push(data);
  }
);
this.exerciseService.onLoadUpdated.subscribe(
  (data: LoadsModel) => {
    this.exerciseService.gerMyLoads(this.exercise.idExercise)
      .subscribe(
        (dataLoad: LoadsModel[]) => {
          this.exercise.charges= dataLoad;
        }
      );

    this.loadToUpdate=null;
    this.updateMode=false;
    this.showOption=false;

  }
);
this.exerciseService.onProgramLoaded.subscribe(
  () =>{
    // console.log(this.exercise!=null);
    this.exercise=null;
    }
);
  }



  onEditLoad(idLoad: number){
    console.log(idLoad);

    this.exerciseService.gerLoadById(idLoad).subscribe(
      (data: LoadsModel) =>{
        this.loadToUpdate=data;
        this.updateMode=true
      }
    );
  }

  onDeleteLoad(load: LoadsModel){

    this.exerciseService.deleteLoad(load.idLoad).subscribe(
      (data) => {
        const n =    this.exercise.charges.indexOf(load);
        this.exercise.charges.slice(n, 1);
      }

    );

  }
  onShowOption(){
    if (this.showOption === false ) {

      this.showOption = true;
    } else {
      this.loadToUpdate=null;
      this.updateMode=false;
      this.showOption = false;
    }
  }

}
