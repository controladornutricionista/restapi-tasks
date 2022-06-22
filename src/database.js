const mongodb = require("./api/v1/database/connection")

exports.initMongoDB = () => {
    mongodb.connect()
}