const errorMiddleware = (err, req, res, next) => {
  let customError = {
    status: err.status || 500,
    msg: err.message || "Something went wrong. Try again later",
  };

  // Dupllicate Error
  if (err.code && err.code === 11000) {
    customError.status = 400;
    customError.msg = `This ${Object.keys(err.keyValue)} is already taken`;
  }

  // Validation Errors
  if (err.name === "ValidationError") {
    customError.status = 400;
    customError.msg = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Cast Error
  if (err.name === "CastError") {
    customError.status = 404;
    customError.msg = `No Item found with id ${err.value}`;
  }

  return res.status(customError.status).send({ error: customError.msg });
};

module.exports = errorMiddleware;
