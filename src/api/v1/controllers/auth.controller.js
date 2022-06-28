const Usuario = require("../database/Usuarios");
const httpStatus = require("http-status");
const { compareAsync } = require("../../../utils/compare-password")
const { generateToken } = require("../../../utils/jwt");

exports.login = async (req, res, next) => {
  try {
    const { usuario, contrasena } = req.body;
    const user = await Usuario.findOne({ usuario });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "El usuario no existe!",
        body: null,
      });
    }
    const response = await compareAsync(contrasena, user.contrasena);
    if (!response) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "La contraseña es incorrecta!",
        body: null,
      });
    }

    delete user.contrasena;
    const tokenObject = generateToken(user._id);

    res.status(httpStatus.OK).json({
      message: "Login correcto!",
      body: {
        user: user,
        ...tokenObject,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.perfil = (req, res, next) => {
  const { user } = req;

  delete user.contrasena

  return res.status(httpStatus.OK).json({
    message: "Usuario correcto!",
    body: user,
  });
};
