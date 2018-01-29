import {Component, Input, OnInit} from '@angular/core';
import {ExerciseModel} from "../exercise-model";
import {LoadsModel} from "../loads-model";

@Component({
  selector: 'app-add-load',
  templateUrl: './add-load.component.html',
  styleUrls: ['./add-load.component.css']
})
export class AddLoadComponent implements OnInit {

  constructor() { }
  @Input() exercise: ExerciseModel;
  load: string='';
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

  onSaveLoad(){
    this.exercise.loads.push(

        new LoadsModel(this.exercise.loads.length,this.load,this.getToDayString())
      );
//this.exerciseServise.onExerciseAdded.next(this.exercises);
    this.load='';
   }

  ngOnInit() {
  }

}
