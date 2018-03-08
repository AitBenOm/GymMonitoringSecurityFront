export class UserModel {

idUser: number;
firstName: string;
lastName: string;
email: string;
pwd: string;
avatarPath: string;


  constructor(firstName: string, lastName: string, email: string, pwd: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.pwd = pwd;
  }
}
