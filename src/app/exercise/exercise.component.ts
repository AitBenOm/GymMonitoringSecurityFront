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
  showForm: boolean=false;
  showOption: boolean = false;
  loadToUpdate: LoadsModel;
  updateMode: boolean;


  constructor(private programService: ProgramService, private exerciseService: ExerciseService) {
    this.programService.onProgramChanged.subscribe(
      (data)=> {
        this.exercise = null;
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
this.exerciseService.onProgramLoaded.subscribe(
  () =>{
    // console.log(this.exercise!=null);
    this.exercise=null;
    }
);
  }



  onEditLoad(idLoad: number){
    console.log(idLoad);
    if (this.showForm === false ) {
      this.showForm = true;
    }
    this.exerciseService.gerLoadById(idLoad).subscribe(
      (data: LoadsModel) =>{
        this.loadToUpdate=data;
        this.updateMode=true
      }
    );
  }
  onShowOption(){
    if (this.showOption === false ) {
      this.showOption = true;
    } else {
      this.showOption = false;
    }
  }

}
