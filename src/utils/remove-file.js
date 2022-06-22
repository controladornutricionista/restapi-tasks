const fs = require("fs/promises")

exports.removeFile = async (path) => {
    try {
        await fs.unlink(path)
    } catch (error) {
        console.log("unlink error", error);
    }
}