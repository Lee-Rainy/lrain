export class FetchError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.data = data;
  }
}
