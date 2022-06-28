const Usuario = require("../database/Usuarios");
const httpStatus = require("http-status");

exports.getUsuarios = async (req, res, next) => {
  try {
    const users = await Usuario.find().populate("rol");
    res.status(httpStatus.OK).json({
      message: "Carga completa correctamente!",
      body: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.crearUsuario = async (req, res, next) => {
  try {
    const usuario = new Usuario({ ...req.body });
    const usuarioSaved = await usuario.save();
    await usuarioSaved.populate("rol");
    res.status(httpStatus.CREATED).json({
      message: "Se guardó correctamente!",
      body: usuarioSaved,
    });
  } catch (error) {
    next(error);
  }
};

exports.editarUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const userUpdated = await Usuario.findOneAndUpdate(
      { _id: usuarioId },
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    );
    await userUpdated.populate("rol");
    res.status(httpStatus.CREATED).json({
      message: "Se actualizó correctamente!",
      body: userUpdated,
    });
  } catch (error) {
    next(error);
  }
};

exports.eliminarUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    await Usuario.deleteOne({ _id: usuarioId });
    res.status(httpStatus.OK).json({
      message: "Se eliminó correctamente!",
      body: null,
    });
  } catch (error) {
    next(error);
  }
};
