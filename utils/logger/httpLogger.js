const morgan = require("morgan");
const json = require("morgan-json");
const logger = require("./logger");

morgan.token("description", (req, res) => req.error);

const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  description: ":description",
  contentLength: ":res[content-length]",
  responseTime: ":response-time",
});

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, url, status, contentLength, description, responseTime } =
        JSON.parse(message);

      logger.info("HTTP Access Log", {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        description,
        responseTime: Number(responseTime),
      });
    },
  },
});

module.exports = httpLogger;
