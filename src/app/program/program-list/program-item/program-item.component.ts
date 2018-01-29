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


  constructor(private authService: AuthService) { }
  @Input() programs: ProgramModel;
  @Input() index: number;
  ngOnInit() {
   /* this.programService.exerciseToShow.emit(null);*/
   console.log("init program-item");
    console.log(this.authService.isAuthenticated());
  }

}
