import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../program.service';
import {ProgramModel} from '../program-model';
import {ExerciseModel} from '../../exercise/exercise-model';
import {LoadsModel} from '../../exercise/loads-model';
import {isNull} from 'util';
import {ExerciseService} from "../../exercise/exercise.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'],
  animations: [
    trigger('addProgram', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0) '
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateY(100px)'
        }),
        animate(400),
      ] ),
      transition('* => void', [
        animate(400, style({
          transform: 'translateX(-100px) ',
          opacity:0

        })),
      ] )


    ])
  ]
})
export class AddProgramComponent implements OnInit {

  constructor(
    private programService: ProgramService,
    private exerciseService: ExerciseService) { }
  programName: string='';
  exerciseName: string ='';
  loadName: string ='';
  loadType: string =''

  programAdded = false;
  exerciseAdded = false;
  onExerciseAdded = true;

  program: ProgramModel ;
  exercise: ExerciseModel;
  load: LoadsModel ;

  ngOnInit() {
  }


  onAddProgram() {
    this.programAdded = true;

  }
  onAddExercise() {
    this.exerciseAdded = true;
  }
onSaveProgram () {

    const program = new ProgramModel(this.programName, new Date(),  new Date(), []);
    const exercise = new ExerciseModel(this.exerciseName, []);
    const load = new LoadsModel(this.loadName + " " + this.loadType , new Date());
   this.programService.addProgram(program)
     .subscribe(
      (programData: ProgramModel) => {
      program.idProgram = programData.idProgram;
      console.log(exercise.exerciseName);
        this.exerciseService.addExercise(exercise, program.idProgram.toString())
          .subscribe(
          (exerciseData: ExerciseModel) => {
            exercise.idExercise = exerciseData.idExercise;
            console.log(exerciseData);
            this.exerciseService.addLoad(load, exercise.idExercise.toString())
              .subscribe(
                (loadData: LoadsModel) => {
                  console.log(loadData);
                }, error2 => {console.log(error2);}
                );
          }, error2 => {
            console.log(error2);
          }
        );
      }, error2 => {
        console.log(error2);
      }
    );

  this.programName = '';
  this.loadName = '';
  this.exerciseName = '';
  this.programAdded = false;
  this.exerciseAdded = false;

  this.programService.onProgramAdded.next(program);

  }
}
