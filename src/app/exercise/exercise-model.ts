import {LoadsModel} from "./loads-model";

export class ExerciseModel {
   idExercise: number;
   exerciseName: string;
   charges: LoadsModel[];


  constructor(exerciseName: string, charges: LoadsModel[]) {
    this.exerciseName = exerciseName;
    this.charges = charges;
  }
}
