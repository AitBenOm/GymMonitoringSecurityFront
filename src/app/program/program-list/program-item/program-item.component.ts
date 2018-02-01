import {Component, Input, OnInit} from '@angular/core';
import {ProgramModel} from "../../program-model";
import {ProgramService} from "../../program.service";
import {AuthService} from "../../../Auth/auth.service";

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.css']
})
export class ProgramItemComponent implements OnInit {
  @Input() programs: ProgramModel;


  constructor(private authService: AuthService) { }
showForm: boolean=false;
  showOption: boolean = false;
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
  ngOnInit() {
   /* this.programService.exerciseToShow.emit(null);*/

  }

}
