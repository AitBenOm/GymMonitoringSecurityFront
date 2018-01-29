import { Component, OnInit } from '@angular/core';
import {ProgramService} from "./program.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  constructor(private programService: ProgramService) { }


  ngOnInit() {
console.log("init Program");
    this.programService.exerciseToShow.next(null);
  }

}
