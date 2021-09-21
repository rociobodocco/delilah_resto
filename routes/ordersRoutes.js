const {orders} = require('../src/models/orders.js');
const { validateOrderExist, validateDataOrder } = require('../middlewares/ordersMidd.js');
const { validateProductExist } = require('../middlewares/productsMidd.js');
const { validateAdmin } = require('../middlewares/usersMidd.js');
const { jwt, secretJwt } = require("../src/config/db.js");

module.exports = (app) => {
  // ENDPOINTS ORDERS:
  app.get("/orders", validateAdmin, async (req, res) => {
    try {
      res.status(200).json(
        await orders.findAll({
          include: [{ model: products }, { model: users }],
        })
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/orders/:id", validateAdmin, async (req, res) => {
    try {
      res.status(200).json(
        await orders.findByPk(req.params.id, {
          include: [{ model: products }, { model: users }],
        })
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/orders",  validateProductExist, validateDataOrder, async (req, res) => {
    const { total_price, date, state, payoptions_id, users_id } = req.body;

    const newOrder = orders.build({
      total_price,
      date,
      state,
      payoptions_id,
      users_id,
    });

    try {
      res.status(201).json(await newOrder.save());
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/orders/:id", validateAdmin, validateOrderExist, async (req, res) => {
    try {
      res.status(200).json(await req.ordersData.update(req.body));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/orders/:id", validateAdmin, validateOrderExist, async (req, res) => {
    try {
      res.status(200).json(await req.ordersData.update({ state: "cancelado" }));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
};
