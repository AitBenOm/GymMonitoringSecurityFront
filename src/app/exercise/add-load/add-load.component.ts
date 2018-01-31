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

  onSaveLoad(){
    this.exercise.charges.push(

        new LoadsModel(this.load,new Date())
      );

    this.load = '';
   }

  ngOnInit() {
  }

}
