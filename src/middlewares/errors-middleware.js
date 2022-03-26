const errorMiddleware = (err, req, res, next) => {
  return res.status(err.code).send({ error: err.message });
};

module.exports = errorMiddleware;
