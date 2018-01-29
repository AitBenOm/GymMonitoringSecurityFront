export class LoadsModel {
public id: number;
public load: string;
public dateModification: string;


  constructor(id: number, load: string, dateModification: string) {
    this.id = id;
    this.load = load;
    this.dateModification = dateModification;
  }
}
