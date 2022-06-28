const httpStatus = require("http-status");
const { removeFile } = require("../../../utils/remove-file");
const Archivo = require("../database/Archivos")
const path = require("path")

module.exports = {
    listarArchivos: async (req, res, next) => {
        try {
            const files = await Archivo.find({})
            return res.status(httpStatus.OK).json({
                message: "Carga completa!",
                body: files
            }) 
        } catch (error) {
            next(error)
        }
    },
    agregarArchivo: async (req, res, next) => {
        try {
            const reqFile = req.file
            const file = new Archivo({
                peso: reqFile.size,
                tipo: reqFile.mimetype,
                nombre: reqFile.filename,
                nombreOriginal: reqFile.originalname,
                source: reqFile.destination,
                path: reqFile.path,
            })
    
            const fileSaved = await file.save()
    
            return res.status(httpStatus.CREATED).json({
                message: "Se guardó correctamente!",
                body: fileSaved
            })
        } catch (error) {
            next(error)
        }
    },
    eliminarArchivo: async (req, res, next) => {
        try {
            const { fileId } = req.params
            const fileBeforeDelete = await Archivo.findOne({ _id: fileId })
            fileBeforeDelete && await removeFile(fileBeforeDelete.path)
            fileBeforeDelete && await Archivo.deleteOne({ _id: fileId })
            res.status(httpStatus.OK).json({
                message: "Se eliminó correctamente!",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }
}
