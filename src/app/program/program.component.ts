import { Component, OnInit } from '@angular/core';
import {ProgramService} from "./program.service";
import {ExerciseService} from "../exercise/exercise.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) { }


  ngOnInit() {


  }

}
