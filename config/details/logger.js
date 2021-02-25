const path = require("path");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const { logConfig } = require("../");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "../log"),
});

const dev = morgan(logConfig.dev, {
  skip: (req, res) => res.statusCode < 400,
});

const combined = morgan(logConfig.combined, { stream: accessLogStream });

module.exports = {
  dev,
  combined,
};
