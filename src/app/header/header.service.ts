import {EventEmitter, Injectable} from '@angular/core';
import {ProgramModel} from "../program/program-model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class HeaderService {

  constructor() { }
  onProgramsFounded = new Subject<ProgramModel[]>();
  onKewWordProgramChanged = new EventEmitter<string>();
  onKewWordExerciseChanged = new EventEmitter<string>();
}
