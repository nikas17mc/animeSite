const index = require("./index");
const error = require("./error");

// Export the routes
module.exports = function (app) {
    app.use("/", index);
};