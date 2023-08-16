const { info } = require("./logger");

const noHandlers = (req, resp) => {
  resp.status(404).send("No code is available for your server");
};

const errorHandler = (error, request, response, next) => {
  info(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const reqLogger = (req, resp, next) => {
  info("Method:", req.method);
  info("Path:  ", req.path);
  info("Body:  ", req.body);
  next();
};

module.exports = {
  errorHandler,
  noHandlers,
  reqLogger,
};
