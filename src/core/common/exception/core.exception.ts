export class CoreException extends Error {
  #code: string;
  constructor(code: string, message: string) {
    super(message);
    this.#code = code;
    this.name = 'CoreException';
  }

  get code() {
    return this.#code;
  }

  get message() {
    return super.message;
  }
}
