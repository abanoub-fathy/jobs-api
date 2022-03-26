const errorMiddleware = (err, req, res, next) => {
  console.log(err.status);
  return res.status(err.status || 400).send({ error: err.message });
};

module.exports = errorMiddleware;
