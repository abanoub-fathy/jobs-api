const notFound = (req, res, next) => {
  return res.status(400).send({ error: "Route not Found" });
};

module.exports = notFound;
