class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  // throw error method
  static throwError(message, code = 500) {
    throw new CustomError(message, code);
  }
}

module.exports = CustomError;
