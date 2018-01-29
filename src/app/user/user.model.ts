export class UserModel {

 private _id: number;
private _firstName: string;
private _lastName: string;
private _email: string;
private _pwd: string


  constructor(id: number, firstName: string, lastName: string, email: string, pwd: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._pwd = pwd;
  }

  get id(): number {
    return this._id;
  }


  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get pwd(): string {
    return this._pwd;
  }

  set pwd(value: string) {
    this._pwd = value;
  }
}
