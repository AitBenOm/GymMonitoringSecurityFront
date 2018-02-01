import {Component, Input, OnInit} from '@angular/core';
import {ExerciseModel} from "../exercise-model";
import {LoadsModel} from "../loads-model";
import {ExerciseService} from '../exercise.service';

@Component({
  selector: 'app-add-load',
  templateUrl: './add-load.component.html',
  styleUrls: ['./add-load.component.css']
})
export class AddLoadComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) { }
  @Input() exercise: ExerciseModel;
  load: string = '';

  onSaveLoad(){
    const load = new LoadsModel(this.load, new Date());
    this.exerciseService.addLoad(load, this.exercise.idExercise.toString())
      .subscribe(
        (data: LoadsModel) => {

          console.log(data);
        }, error =>{
          console.log(error);
        }
      );

    this.load = '';
    this.exerciseService.onLoadAdded.next(load);
   }

  ngOnInit() {
  }

}
