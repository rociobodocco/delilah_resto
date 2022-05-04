const {
  validateProductExist,
  validateDataProd,
} = require("../controllers/productsMidd");
const { validateAdmin } = require("../controllers/usersMidd");
const { products } = require("../models");

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
  }); 

  app.get("/products/:id", async (req, res) => {
    try {
      res.status(200).json(await products.findByPk(req.params.id));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }); 

  app.post(
    "/products",
    validateAdmin,
    validateDataProd,
    validateProductExist,
    async (req, res) => {
      const { name, price, active, image } = req.body;

      const newProduct = await products.create({
        name: name,
        price: price,
        active: active,
        image: image,
      });

      try {
        res.status(201).json(newProduct.save());
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    }
  ); 

  app.put(
    "/products/:id",
    validateAdmin,
    async (req, res) => {
      // active: true
      try {
        const id = req.params.id;
        const { name, price, active, image } = req.body;
        await products.update(
          { name, price, active, image },
          {
            where: {
              id,
            },
          }
        ).then(res.status(200).json({message: `El producto se actualizó con éxito`}))
      } catch (e) {
        res.status(400).json({ message: `No se pudo actualizar el producto` });
      }
    }
  ); 

  app.delete(
    "/products/:id",
    validateAdmin,
    async (req, res) => {
      try {
        const id = await req.params.id;
        console.log(id);
        products
          .destroy({
            where: { id: id },
          })
          .then(
            res.status(200).json({ message: `El producto se eliminó con éxito` })
          );
      } catch (e) {
        res.status(400).json({ message: `No se pudo eliminar el producto` });
      }
    }); 
};
