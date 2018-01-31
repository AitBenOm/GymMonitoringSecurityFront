export class LoadsModel {
public idLoad: number;
public charge: string;
public lastModification: Date;


  constructor(charge: string, lastModification: Date) {
    this.charge = charge;
    this.lastModification = lastModification;
  }
}
