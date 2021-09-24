const {
  orders,
  users,
} = require("../src/models");
const {
  validateDataOrder,
} = require("../middlewares/ordersMidd.js");
const { validateProductExist } = require("../middlewares/productsMidd.js");
const { validateAdmin } = require("../middlewares/usersMidd.js");

module.exports = (app) => {
  // ENDPOINTS ORDERS:
  app.get("/orders", validateAdmin, async (req, res) => {
    try {
      res.status(200).json(
        await orders.findAll({
          include: [{ model: users }],
        })
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }); //ok

  app.get("/orders/:id", validateAdmin, async (req, res) => {
    try {
      res.status(200).json(await orders.findByPk(req.params.id));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }); //ok

  app.post(
    "/orders",
    validateProductExist,
    validateDataOrder,
    async (req, res) => {
      const { total_price, date, state, users_id, payoptions_id } = req.body;

      const newOrder = await orders.create({
        total_price: total_price,
        date: date,
        state: state,
        users_id: users_id,
        payoptions_id: payoptions_id,
      });

      try {
        res.status(201).json(newOrder.save());
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    }
  ); //ok

  app.put("/orders/:id", validateAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const { total_price, date, state, users_id, payoptions_id } = req.body;
      await orders
        .update(
          { total_price, date, state, users_id, payoptions_id },
          {
            where: {
              id,
            },
          }
        )
        .then(
          res.status(200).json({ message: `La orden se actualizó con éxito` })
        );
    } catch (e) {
      res.status(400).json({ message: `No se pudo actualizar la orden` });
    }
  }); //ok

  app.delete("/orders/:id", validateAdmin, async (req, res) => {
    try {
      const id = await req.params.id;
      console.log(id);
      orders
        .destroy({
          where: { id: id },
        })
        .then(
          res.status(200).json({ message: `La orden se eliminó con éxito` })
        );
    } catch (e) {
      res.status(400).json({ message: `No se pudo eliminar la orden` });
    }
  }); //ok
};
