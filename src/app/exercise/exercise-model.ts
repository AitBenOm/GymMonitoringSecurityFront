import {LoadsModel} from "./loads-model";

export class ExerciseModel {
  private _id: number;
  private _name: string;
  private _loads: LoadsModel[];


  constructor(id: number, name: string, loads: LoadsModel[]) {
    this._id = id;
    this._name = name;
    this._loads = loads;
  }



  get loads(): LoadsModel[] {
    return this._loads;
  }

  set loads(value: LoadsModel[]) {
    this._loads = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
