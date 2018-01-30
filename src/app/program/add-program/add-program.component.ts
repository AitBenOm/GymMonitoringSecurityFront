import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../program.service';
import {ProgramModel} from '../program-model';
import {ExerciseModel} from '../../exercise/exercise-model';
import {LoadsModel} from '../../exercise/loads-model';
import {isNull} from 'util';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {

  constructor(private programService: ProgramService) { }
  programTitle = '';
  exerciseTitle = '';
  load = '';

  programAdded = false;
  exerciseAdded = false;
  onExerciseAdded = true;

  program: ProgramModel;
  exercise: ExerciseModel;

  ngOnInit() {
  }


  onAddProgram() {
    this.programAdded = true;

  }
  onAddExercise() {
    this.exerciseAdded = true;
  }
onSaveProgram () {
   this.programService.addProgram(
     new ProgramModel(this.programTitle, this.programService.getToDayString(), this.programService.getToDayString(), [new ExerciseModel(this.exerciseTitle, [
       new LoadsModel( this.load, this.programService.getToDayString())])
     ])

   );
  this.programTitle = '';
  this.load = '';
  this.exerciseTitle = '';

  this.programAdded = false;
  this.exerciseAdded = false;
  }
}
