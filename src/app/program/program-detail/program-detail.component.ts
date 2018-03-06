import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProgramService} from '../program.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProgramModel} from '../program-model';
import {ExerciseModel} from '../../exercise/exercise-model';
import {ExerciseService} from '../../exercise/exercise.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {LoadsModel} from "../../exercise/loads-model";
import {HeaderService} from "../../header/header.service";
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css'],
  animations: [
    trigger('detailShow', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0) '
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateX(-100px)'
        }),
        animate(300),
      ] ),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px) ',
          opacity:0

        })),
      ] )


    ]),
    trigger('addExercise', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0) '
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateY(100px)'
        }),
        animate(500),
      ] ),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(-100px) ',
          opacity:0

        })),
      ] )


    ]),
    trigger('exerciseList', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0) '
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
           // transform: 'translateY(-100px)',
            opacity:0,
            offset: 0
          }),
          style({
           // transform: 'translateY(-50px)',
            opacity:0.5,
            offset: 0.3
          }),
          style({
          //  transform: 'translateY(-20px)',
            opacity:1,
            offset: 0.8
          }),
          style({
            // transform: 'translateY(0px)',
            opacity:1,
            offset: 1
          }),
        ]))
      ] ),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(500, style({
            transform: 'translateX(100px) ',
            opacity:0

          }))
        ])

      ] )

    ]),
  ]

})
export class ProgramDetailComponent implements OnInit {

  id: number;
  program: ProgramModel;
  exercises: ExerciseModel[];
  myLastLoad: string;
  showForm: boolean=false;
  showOption: boolean = false;
  exerciseToUpdate: ExerciseModel=null;
  exerciseToDelete: ExerciseModel=null;
  updateMode: boolean;
  keyWord: string;
  searchableField='exerciseName';





  constructor(private programService: ProgramService,
              private router: Router,
              private exerciseService: ExerciseService,
              private route: ActivatedRoute,
              private headerService: HeaderService
             ) {}

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          console.log("Details Changed");
          this.programService.onProgramChanged.next(null);
          this.id = +params['id'];
          console.log(this.id);
           this.programService.getProgramById(this.id).subscribe(
            (data: ProgramModel)=> {
           console.log(data);
              this.programService.onProgramChosen.next(data);
              this.program = data;
            }
          );

         this.exerciseService.gerMyExercise(this.id).subscribe(
           (data: ExerciseModel[]) => {
             this.exercises = data;
             for ( const exercise of this.exercises){
               this.exerciseService.gerMyLoads(exercise.idExercise).subscribe(
                 (loads: LoadsModel[]) => {
                   exercise.charges = loads;
                   this.myLastLoad = loads[loads.length - 1].charge;
                 }
               );
               }
           }
         );


        }
      );
    //console.log(this.exercises);

    this.exerciseService.onExerciseUpdated.subscribe(
      (data: ExerciseModel) => {
        this.updateMode=false;
        this.showForm=false;
        this.router.navigate(['/program/'+this.id]);

      }
    );
//

    this.headerService.onKewWordExerciseChanged.subscribe(
      (data: string) => {
        this.keyWord=data;
      }
    );


    this.exerciseService.onExerciseAdded.subscribe(
      (data: ExerciseModel) => {
        //   //console.log(data);
        this.exercises.push(data);
        // //console.log(data.charges[data.charges.length-1]);
      }
    );
  }
  onShowDetail(exercise: ExerciseModel) {
  // //console.log('program-detail ' + exercise.exerciseName);
    this.showOption=false;
   this.programService.showDetailExercise(exercise);
  }

  onEditExercise(idExercise: number){
    //console.log(idExercise);

    this.exerciseService.getExerciseById(idExercise).subscribe(
      (data: ExerciseModel) =>{
        this.exerciseToUpdate=data;
        //console.log(this.exerciseToUpdate);
        this.showForm=true;
        this.updateMode=true;
        this.showOption=false;
      }
    );
  }

  onDeleteExercise( ){
    this.exerciseService.deleteExercise(this.exerciseToDelete).subscribe(
      (data) => {
        let n = 0;
        //console.log("*************************");
        for ( const exercise of this.exercises){
          if ( exercise.idExercise === this.exerciseToDelete.idExercise){
            break;
          }
          n++;
        }
        this.exercises.splice(n,1);
        //console.log(data);
      }
      );
  }


  onShowForm() {
    if (this.showForm === false ) {
      this.updateMode=false;
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }
  onShowOption(){
    if (this.showOption === false ) {
      this.showOption = true;
    } else {
      this.showOption = false;
    }
  }
  onShowModal(exercise: ExerciseModel){
  this.exerciseToDelete = exercise;
  }


}
