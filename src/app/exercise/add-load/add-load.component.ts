import {Component, Input, OnInit} from '@angular/core';
import {ExerciseModel} from "../exercise-model";
import {LoadsModel} from "../loads-model";
import {ExerciseService} from '../exercise.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-load',
  templateUrl: './add-load.component.html',
  styleUrls: ['./add-load.component.css']
})
export class AddLoadComponent implements OnInit {

  constructor(private exerciseService: ExerciseService, private router: Router) { }
  @Input() exercise: ExerciseModel;
  load: string = '';
  loadType: string ='';

  @Input()   loadToUpdate: LoadsModel;
  @Input()   updateMode: boolean;

  onSaveLoad(){
    const load = new LoadsModel(this.load+" "+this.loadType, new Date());
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

   onUpdateLoad(load: LoadsModel){
    load.charge = load.charge + " " + this.loadType;
    load.lastModification= new Date();
  this.exerciseService.updateLoad(load)
    .subscribe(
      (data: LoadsModel) => {
        this.exerciseService.onLoadUpdated.next(data);
        console.log(data);
      }, error2 => console.log(error2)
    );
   }

  ngOnInit() {
  }

}
