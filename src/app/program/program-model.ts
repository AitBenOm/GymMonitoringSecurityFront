import {ExerciseModel} from "../exercise/exercise-model";

export class ProgramModel {

 public  idProgram: number;
  public programName: string;
   public dateOfCreation: Date;
  public lastModification: Date;
   public  exercises: ExerciseModel[];


  constructor(programName: string, dateOfCreation: Date, lastModification: Date, exercises: ExerciseModel[]) {
    this.programName = programName;
    this.dateOfCreation = dateOfCreation;
    this.lastModification = lastModification;
    this.exercises = exercises;
  }
}
