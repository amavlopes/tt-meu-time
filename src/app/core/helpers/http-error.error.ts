export class HttpError extends Error {
  status: number;

  constructor(status: number, message?: string | any){
    super(message);
    this.name = "HttpError";
    this.status = status;
  }

}
