export class User {
  firstname: string;
  lastname: string;
  email: string;

  constructor(options: User) {
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.email = options.email;
  }
}
