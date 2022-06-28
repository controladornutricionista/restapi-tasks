const Role = require("../database/Roles");
const httpStatus = require("http-status");

exports.getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(httpStatus.OK).json({
      message: "Carga completa correctamente!",
      body: roles,
    });
  } catch (error) {
    next(error);
  }
};

exports.crearRol = async (req, res, next) => {
  try {
    const role = new Role({ ...req.body });
    const roleSaved = await role.save();
    res.status(httpStatus.CREATED).json({
      message: "Se guardó correctamente!",
      body: roleSaved,
    });
  } catch (error) {
    next(error);
  }
};

exports.eliminarRol = async (req, res, next) => {
  try {
    const { roleId } = req.params;
    await Role.remove({ _id: roleId });
    res.status(httpStatus.OK).json({
      message: "Se eliminó correctamente!",
      body: null,
    });
  } catch (error) {
    next(error);
  }
};
