import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProgramModel} from "../../program-model";
import {ProgramService} from "../../program.service";
import {AuthService} from "../../../Auth/auth.service";

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() programs: ProgramModel[];


  constructor(private authService: AuthService, private programService:ProgramService) { }
showForm: boolean=false;
  showOption: boolean = false;
  sorted: boolean;
  onShowForm() {
    if (this.showForm === false ) {
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
sort(order: string){
  if(!this.sorted){
    this.programs = this.programService.sortProgramsByLastModification(this.programs, order);
    this.sorted=true;
  } else{
    this.sorted=false;
    this.programs = this.programService.sortProgramsByLastModification(this.programs, order).reverse();

  }
}
  ngOnInit(){
   /* this.programService.exerciseToShow.emit(null);*/
console.log(this.programs);
this.programService.onProgramAdded.subscribe(
  (data:any) =>{
    this.showForm = false;
  }
);
  }

  deleteProgram(programToDelete: ProgramModel){
this.programService.deleteProgram(programToDelete).subscribe(
  (data) => {
    let n = 0;
    console.log("*************************");
    for ( const program of this.programs){
      if ( program.idProgram === programToDelete.idProgram){
        break;
      }
      n++;
    }
    this.programs.splice(n,1);
    console.log(data);
  }
);
  }


}
