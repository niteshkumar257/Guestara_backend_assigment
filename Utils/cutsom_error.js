class CustomeError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.status = statuscode;
    this.isOperation = true;
    // this.status=statuscode>=400 && statuscode<500 ?"fail":"error"
    Error.captureStackTrace(this, this.construtor);
  }
}
export default CustomeError;
