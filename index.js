const { initMongoDB } = require("./src/database")
const { bootstrap } = require("./src/bootstrap")
const server = require("./src/server")

async function main() {
    initMongoDB()
    server.listen(server.get('port'), () => {
        // Prints initialization
        console.log('****************************')
        console.log('*    Starting Server')
        console.log(`*    Port: ${server.get("port")}`)
        console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
        console.log('*    Database: MongoDB')
        console.log('****************************')
        bootstrap()
    })
}

main()