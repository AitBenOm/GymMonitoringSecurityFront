import {Component, Input, OnInit} from '@angular/core';
import {ExerciseModel} from '../exercise-model';
import {LoadsModel} from '../loads-model';
import {ExerciseService} from '../exercise.service';
import {ProgramService} from '../../program/program.service';
import {ProgramModel} from '../../program/program-model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  constructor(private exerciseService: ExerciseService, private router: Router, private programService: ProgramService) {
  }

  @Input() exercises: ExerciseModel[];
  @Input() idProgram: number;
  @Input() exerciseToUpdate: ExerciseModel;
  @Input() updateMode: boolean;
  program: ProgramModel;
  exerciseName = '';
  loadName = '';
  loadType: string = '';
  exerciseAdded = false;

  onSaveExercise() {

    const exercise = new ExerciseModel(this.exerciseName, []);
    const load = new LoadsModel(this.loadName + " " + this.loadType, new Date());
    this.exerciseService.addExercise(exercise, this.idProgram.toString())
      .subscribe(
        (exerciseData: ExerciseModel) => {
          exercise.idExercise = exerciseData.idExercise;
          console.log(exerciseData);
          this.exerciseService.addLoad(load, exercise.idExercise.toString())
            .subscribe(
              (loadData: LoadsModel) => {
                console.log(loadData);
                this.exerciseService.onLoadUpdated.next(loadData);
              }, error2 => {
                console.log(error2);
              }
            );
        }, error2 => {
          console.log(error2);
        }
      );
    this.exerciseName = '';
    this.loadName = '';
    this.exerciseAdded = false;
    this.exerciseService.onExerciseAdded.next(exercise);
    this.router.navigate(['/program']);
  }

  ngOnInit() {

  }

  onUpdateExercise(exercise: ExerciseModel) {

    this.exerciseService.updateExercise(exercise)
      .subscribe(
        (data: ExerciseModel) => {
          console.log(data);
          this.exerciseService.onExerciseUpdated.next(exercise);
          this.programService.getProgramById(this.idProgram).subscribe(
            (program: ProgramModel)=> {
              program.lastModification= new Date();
              this.programService.onProgramUpdated.next(program);
              this.programService.updateProgram(program).subscribe(
                (dataN) => {
                  console.log(program);
                  this.program = program;
                }
              );

            }
          );
        }, error2 => console.log(error2)
      );
    this.router.navigate(['/program']);
  }
}
