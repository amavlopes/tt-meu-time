export class User {
  firstname: string;
  lastname: string;
  email: string;
  token: string;

  constructor(options: User) {
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.email = options.email;
    this.token = options.token;
  }
}
