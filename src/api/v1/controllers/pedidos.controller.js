const Pedido = require("../database/Pedidos");
const { listarMenu } = require("./menu.controller")
const menus = require("../constants/menus.json");
const httpStatus = require("http-status");

exports.getPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find().populate("usuario");
    res.status(httpStatus.OK).json({
      message: "Cargo su pedido completo correctamente!",
      body: pedidos,
    });
  } catch (error) {
    next(error);
  }
};

exports.crearPedido = async (req, res, next) => {
  try {
    //const pedidos = listarMenu(req.body.pedidos)
    const pedido = new Pedido({ ...req.body });
    const pedidoSaved = await pedido.save();
    res.status(httpStatus.CREATED).json({
      message: "Se creo su pedido correctamente",
      body: pedidoSaved,
    });
  } catch (error) {
    next(error);
  }
};

exports.eliminarPedido = async (req, res, next) => {
  try {
    const { pedidoID } = req.params;
    await Pedido.deleteOne({ _id: pedidoID });
    res.status(httpStatus.OK).json({
      message: "Se eliminó su pedido correctamente!",
      body: null,
    });
  } catch (error) {
    next(error);
  }
};
