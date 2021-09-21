const { validateProductExist, validateDataProd, validateDataProdForEdit } = require('../middlewares/productsMidd.js');
const { validateAdmin } = require('../middlewares/usersMidd.js');

module.exports = (app) => {
  // ENDPOINTS PRODUCTS:
  app.get("/products", async (req, res) => {
    try {
      res.status(200).json(
        await products.findAll({
          where: {
            active: true,
          },
        })
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }); //ok

  app.get("/products/:id", async (req, res) => {
    try {
      res.status(200).json(await products.findByPk(req.params.id));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }); //ok

  app.post(
    "/products",
    validateAdmin, validateDataProd, validateProductExist,
    async (req, res) => {
      const { name, price, active, image } = req.body;

      const newProduct = products.build({ name, price, active, image });

      try {
        res.status(201).json(await newProduct.save());
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    }
  );

  app.put(
    "/products/:id",
    validateAdmin, validateDataProdForEdit,
    async (req, res) => {
      try {
        res.status(200).json(await req.productsData.update(req.body));
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    }
  );

  app.delete(
    "/products/:id",
    validateAdmin, validateDataProd,
    async (req, res) => {
      try {
        res.status(200).json(await req.productsData.update({ active: false }));
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    }
  );
};
