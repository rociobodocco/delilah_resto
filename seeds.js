const { orders, products, users, ordersHasProducts } = require("./src/models");

// Users
const usersData = [
  {
    username: "gmanu",
    name: "Manuel",
    lastname: "Morrison",
    phone: "4893970022",
    adress: "Olazabal 520",
    password: "5049378Bone",
    email: "manumorrison78@gmail.com",
    rol_id: 1,
  },
  {
    username: "america240690",
    name: "Martina",
    lastname: "Benitez",
    phone: "59278920383",
    adress: "Juan B Justo 2653",
    password: "FranciA04270230",
    email: "benitezmartu24@gmail.com",
    rol_id: 1,
  },
  {
    username: "sabritole78",
    name: "Sabrina",
    lastname: "Toledo",
    phone: "9294748930",
    adress: "Rivadavia 392",
    password: "28174938",
    email: "sabrit78@gmail.com",
    rol_id: 1,
  },
  {
    username: "javi1996",
    name: "Javier",
    lastname: "Martinez",
    phone: "2748923849",
    adress: "Belgrano 1188",
    password: "40993782",
    email: "martinezjavii@gmail.com",
    rol_id: 1,
  },
  {
    username: "rociobodocco",
    name: "Rocio",
    lastname: "Bodocco",
    phone: "5491122542962",
    adress: "Maipu 201",
    password: "294789Holanda45",
    email: "rocio.bodocco@gmail.com",
    rol_id: 2,
  },
];

// Products
const productsData = [
  {
    name: "Bagel de salmón",
    price: 425,
    active: 1,
    image: "https://picsum.photos/200",
  },
  {
    name: "Sandwich veggie",
    price: 310,
    active: 1,
    image: "https://picsum.photos/200",
  },
  {
    name: "Hamburguesa clásica",
    price: 350,
    active: 1,
    image: "https://picsum.photos/200",
  },
  {
    name: "Ensalada veggie",
    price: 340,
    active: 1,
    image: "https://picsum.photos/200",
  },
  {
    name: "Veggie avocado",
    price: 310,
    active: 1,
    image: "https://picsum.photos/200",
  },
  {
    name: "Focaccia",
    price: 300,
    active: 1,
    image: "https://picsum.photos/200",
  },
  {
    name: "Sandwich Focaccia",
    price: 440,
    active: 1,
    image: "https://picsum.photos/200",
  },
];

// orders
const ordersData = [
  {
    total_price: 10,
    date: "2021-03-01 12:03:23",
    state: "nuevo",
    payoptions_id: 1,
    users_id: 62,
  },
  {
    total_price: 10,
    date: "2021-04-01 12:03:23",
    state: "finalizado",
    payoptions_id: 2,
    users_id: 63,
  },
  {
    total_price: 10,
    date: "2021-05-01 12:03:23",
    state: "confirmado",
    payoptions_id: 3,
    users_id: 63,
  },
  {
    total_price: 10,
    date: "2021-05-01 12:03:23",
    state: "cancelado",
    payoptions_id: 3,
    users_id: 63,
  },
];

const ordersHasProductsData = [
  { cuantity: 1, orders_id: 1, products_id: 1 },
  { cuantity: 1, orders_id: 1, products_id: 2 },
  { cuantity: 1, orders_id: 2, products_id: 2 },
  { cuantity: 1, orders_id: 3, products_id: 3 },
];

orders
  .findByPk(1, {
    include: [{ model: products }, { model: users }],
  })
  .then((data) => console.log(data.products.map((p) => p.name)));
