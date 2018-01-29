import {ExerciseModel} from "../exercise/exercise-model";

export class ProgramModel {

 public  idProgram: number;
  public programName: string;
   public dateOfCreation: string;
  public lastModification: string;
   public  exercises: ExerciseModel[];


  constructor(programName: string, dateOfCreation: string, lastModification: string, exercises: ExerciseModel[]) {
    this.programName = programName;
    this.dateOfCreation = dateOfCreation;
    this.lastModification = lastModification;
    this.exercises = exercises;
  }
}
