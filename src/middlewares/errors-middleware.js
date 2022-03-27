const errorMiddleware = (err, req, res, next) => {
  return res.status(err.status || 400).send({ error: err.message });
};

module.exports = errorMiddleware;
