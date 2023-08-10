const { PORT } = require("./utils/config");
const { info } = require("./utils/logger");
const app = require("./app");

app.listen(PORT);
info(`Server running on port ${PORT}`, "logging from index");

// "build:ui": "cd src && rm -rf dist && rm -rf ../../notes-server/dist && npm run build && cp -r dist ../../notes-server"
