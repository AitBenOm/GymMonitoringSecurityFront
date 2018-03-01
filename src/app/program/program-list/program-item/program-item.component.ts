import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProgramModel} from "../../program-model";
import {ProgramService} from "../../program.service";
import {AuthService} from "../../../Auth/auth.service";
import {HeaderService} from "../../../header/header.service";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() programs: ProgramModel[];



  searchableField: string;
showForm: boolean=false;
  programFounded: boolean = false;
  sorted: boolean;
  programToDelete: ProgramModel;
  keyWord: string;
  programsFounded: ProgramModel[];

  constructor(private authService: AuthService, private programService:ProgramService,private headerService: HeaderService) {
    this.searchableField = 'programName';
  }
  onShowForm() {
    if (this.showForm === false ) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }
onShowOption(prog: ProgramModel){
this.programToDelete= prog;
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

this.programService.onProgramAdded.subscribe(
  (data:any) =>{
    this.showForm = false;
  }
);
 this.headerService.onKewWordProgramChanged.subscribe(
  (data: string) => {
    this.keyWord=data;
  }
);
  }

  deleteProgram(){
    //console.log(this.programToDelete.programName);
this.programService.deleteProgram(this.programToDelete).subscribe(
  (data) => {
    let n = 0;
    //console.log("*************************");
    for ( const program of this.programs){
      if ( program.idProgram === this.programToDelete.idProgram){
        break;
      }
      n++;
    }
    this.programs.splice(n,1);
    //console.log(data);
  }
);
  }
onSearch(){

console.log(this.keyWord);
  for (let program of this.programs) {
    console.log(program.programName.toLocaleLowerCase().startsWith(this.keyWord.toLocaleLowerCase()));
    if (program.programName.toLocaleLowerCase().startsWith(this.keyWord.toLocaleLowerCase())) {
     this.programsFounded.push(program);
    } else {
      this.programFounded = false;
    }
  }
  this.programs=this.programsFounded;
}
}
