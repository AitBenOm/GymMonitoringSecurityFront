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
    let toDay = new Date();
    let dd: any = toDay.getDay();
    let mm: any= toDay.getMonth()+1;
    let yyyy: any= toDay.getFullYear();

    if(dd<10){
      dd='0'+dd;
    }
    if (mm<10){
      mm='0'+mm;
    }
    console.log( mm+'/'+dd+'/'+yyyy);
    return mm+'/'+dd+'/'+yyyy;
  }
  onAddExercise(){
    this.exerciseAdded=true;
  }
  onSaveExercise(){
this.exercises.push(
  new ExerciseModel(this.exercises.length, this.exerciseTitle,[
    new LoadsModel(1,this.load,this.getToDayString())
  ])
);
this.exerciseServise.onExerciseAdded.next(this.exercises);
    this.load='';
    this.exerciseTitle='';


    this.exerciseAdded=false;
  }
  ngOnInit() {
  }

}
