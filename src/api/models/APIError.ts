class APIError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError;
