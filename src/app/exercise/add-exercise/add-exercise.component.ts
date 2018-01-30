import {Component, Input, OnInit} from '@angular/core';
import {ExerciseModel} from "../exercise-model";
import {LoadsModel} from "../loads-model";
import {ExerciseService} from "../exercise.service";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  constructor(private exerciseServise: ExerciseService) { }

  @Input() exercises: ExerciseModel[];

  exerciseTitle: string='';
  load: string='';
  exerciseAdded: boolean=false;

  getToDayString(){

  }
  onAddExercise(){
    this.exerciseAdded=true;
  }
  onSaveExercise(){

  }
  ngOnInit() {
  }

}
