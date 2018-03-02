import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ExerciseService} from "./exercise.service";
import {ExerciseModel} from "./exercise-model";
import {ProgramService} from "../program/program.service";
import {Subscription} from "rxjs/Subscription";
import {LoadsModel} from './loads-model';
import {ProgramModel} from "../program/program-model";
import {Data} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  animations: [
    trigger('exerciseShow', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0) '
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateX(-100px)'
        }),
        animate(300),
      ] ),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px) ',
          opacity:0

        })),
      ] )


    ])
  ]

})
export class ExerciseComponent implements OnInit {

  exercise: ExerciseModel;
  showOption: boolean = false;
  loadToUpdate: LoadsModel=null;
  loadToDelete: LoadsModel=null;
  updateMode: boolean;

  @Input() idProgram: number;


  constructor(private programService: ProgramService, private exerciseService: ExerciseService) {
    this.programService.onProgramChanged.subscribe(
      (data)=> {
        this.exercise = null;
        this.updateMode=false;
        this.loadToUpdate=null;
      }
    );
    // this.programService.exerciseToShow.subscribe(
    //   (exercise: ExerciseModel) =>{
    //     console.log("Constructor "+exercise);
    //     //console.log(exercise);
    //     this.exercise = exercise;
    //
    //   }
    // );
  }



  ngOnInit() {

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
    this.programService.getProgramById(this.idProgram).subscribe(
      (program: ProgramModel)=>{
        let n = 0;
        program.lastModification = new Date();
        this.programService.updateProgram(program).subscribe(
          (programUpdated) =>{
            this.programService.onProgramUpdated.next(program);
          }
        );
      }
    );
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
this.programService.exerciseToShow.subscribe(
      (exercise: ExerciseModel) =>{
        console.log("Constructor "+exercise);
        //console.log(exercise);
        this.exercise = exercise;

      }
    );

  }



  onEditLoad(idLoad: number){
    console.log(idLoad);

    this.exerciseService.gerLoadById(idLoad).subscribe(
      (data: LoadsModel) =>{
        this.loadToUpdate=data;
        this.loadToUpdate.charge= this.loadToUpdate.charge.split('(')[0];
        this.updateMode=true
      }
    );
  }

  onDeleteLoad(){

    this.exerciseService.deleteLoad(this.loadToDelete.idLoad).subscribe(
      data => {
        const n =    this.exercise.charges.indexOf(this.loadToDelete);
        this.exercise.charges.splice(n, 1);
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
  onShowModal(load: LoadsModel){
  this.loadToDelete=load;
  }


}
