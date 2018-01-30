export class LoadsModel {
public idLoad: number;
public charge: string;
public lastModification: string;


  constructor(charge: string, lastModification: string) {
    this.charge = charge;
    this.lastModification = lastModification;
  }
}
