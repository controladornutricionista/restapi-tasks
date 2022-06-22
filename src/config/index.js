const config = require("../../config.json")

module.exports = {
    ...config,
    env: process.env.NODE_ENV,
    port: process.env.PORT || config.port,
}