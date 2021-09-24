const { products } = require("../src/models");

function validateProductExist(req, res, next) {
  products.findByPk(req.params.id).then((prod) => {
    if (prod) {
      res
        .status(400)
        .json({ error: `El producto ${req.body.name} ya existe` });
    } else {
      next();
    }
  });
};

function validateDataProd(req, res, next) {
  const { name, active, price, image } = req.body;

  if (!name || !price || !active || !image) {
    res.status(404).json({
      error: `Incomplete data, please tray again.`,
    });
  } else {
    next();
  }
};

module.exports = {
  validateProductExist,
  validateDataProd
};
