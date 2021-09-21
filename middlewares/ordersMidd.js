const { orders } = require("../src/models/orders.js");

function validateOrderExist(req, res, next) {
  orders.findByPk(req.params.id).then((order) => {
    if (order.id > 0) {
      res.status(400).json({ error: `La orden ${req.body.id} ya existe` });
    } else {
      next();
    }
  });
}

function validateDataOrder(req, res, next) {
  const { total_price, state, date } = req.body;

  if (!total_price || !state || !date) {
    res.status(404).json({
      error: `Incomplete data, please tray again.`,
    });
  } else {
    next();
  }
}

module.exports = { validateOrderExist, validateDataOrder };
