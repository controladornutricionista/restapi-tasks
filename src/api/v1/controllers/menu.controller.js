const menus = require("../constants/menus.json");
const httpStatus = require("http-status");
const { Error } = require("../../../utils/api-response");

function listarMenu(req, res, next) {
  try {
    res.status(httpStatus.OK).json({
        message:"TODO OK",
        status: "ok",
        body: menus
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  listarMenu,
};
