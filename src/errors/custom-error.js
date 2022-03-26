class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  // throw error method
  static throwError(message, status = 500) {
    throw new CustomError(message, status);
  }
}

module.exports = CustomError;
