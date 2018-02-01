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

  constructor(private exerciseService: ExerciseService) { }

  @Input() exercises: ExerciseModel[];

  exerciseName: string='';
  loadName: string='';
  exerciseAdded: boolean=false;

  getToDayString(){

  }
  onAddExercise(){
    const exercise = new ExerciseModel(this.exerciseName, []);
    const load = new LoadsModel(this.loadName, new Date());
    this.exerciseService.addExercise(exercise, this.exercises[0].)
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
    this.exerciseAdded=true;
  }
  onSaveExercise(){

  }
  ngOnInit() {
  }

}
