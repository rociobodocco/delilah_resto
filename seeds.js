const {
  orders,
  products,
  users,
  ordersHasProducts,
  payOptions,
  rol,
} = require("./src/models");

// Roles
const roleData = [
  {
    name: "administrator",
  },
  {
    name: "customer",
  },
];

// Payment Options
const paymentOptionsData = [
  {
    name: "Tarjeta de crédito",
    active: 1,
  },
  {
    name: "Transferencia",
    active: 1,
  },
  {
    name: "MercadoPago",
    active: 1,
  },
];

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
    rol_id: 4,
  },
  {
    username: "america240690",
    name: "Martina",
    lastname: "Benitez",
    phone: "59278920383",
    adress: "Juan B Justo 2653",
    password: "FranciA04270230",
    email: "benitezmartu24@gmail.com",
    rol_id: 4,
  },
  {
    username: "sabritole78",
    name: "Sabrina",
    lastname: "Toledo",
    phone: "9294748930",
    adress: "Rivadavia 392",
    password: "28174938",
    email: "sabrit78@gmail.com",
    rol_id: 4,
  },
  {
    username: "javi1996",
    name: "Javier",
    lastname: "Martinez",
    phone: "2748923849",
    adress: "Belgrano 1188",
    password: "40993782",
    email: "martinezjavii@gmail.com",
    rol_id: 4,
  },
  {
    username: "rociobodocco",
    name: "Rocio",
    lastname: "Bodocco",
    phone: "5491122542962",
    adress: "Maipu 201",
    password: "294789Holanda45",
    email: "rocio.bodocco@gmail.com",
    rol_id: 3,
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

const ordersHasProductsData = [
  { quantity: 1, orders_id: 57, products_id: 5 },
  { quantity: 2, orders_id: 57, products_id: 8 },
  { quantity: 6, orders_id: 58, products_id: 6 },
  { quantity: 4, orders_id: 59, products_id: 9 },
];

// orders
const ordersData = [
  {
    total_price: ordersHasProductsData.quantity*productsData.price,
    date: "2021-03-01 12:03:23",
    state: "nuevo",
    payoptions_id: 5,
    users_id: 70,
  },
  {
    total_price: ordersHasProductsData.quantity*productsData.price,
    date: "2021-04-01 12:03:23",
    state: "finalizado",
    payoptions_id: 6,
    users_id: 72,
  },
  {
    total_price: ordersHasProductsData.quantity*productsData.price,
    date: "2021-05-01 12:03:23",
    state: "confirmado",
    payoptions_id: 6,
    users_id: 69,
  },
  {
    total_price: ordersHasProductsData.quantity*productsData.price,
    date: "2021-05-01 12:03:23",
    state: "cancelado",
    payoptions_id: 4,
    users_id: 73,
  },
];


//Send roleData data to db:
// const data = roleData.map (async role =>  {
//   const tempPed= await rol.create(role, { fields: ["name"] });
// });

//Send paymentOptionsData data to db:
// const data = paymentOptionsData.map (async payop =>  {
//   const tempPed= await payOptions.create(payop, { fields: ["name", "active"] });
// });

//Send usersData data to db:
// const data = usersData.map (async user =>  {
//   const tempPed= await users.create(user, { fields: ["username", "name", "lastname", "phone", "adress", "password", "email", "rol_id"] });
// });

//Send productsData data to db:
// const data = productsData.map (async p =>  {
//   const tempPed= await products.create(p, { fields: ["name", "price", "active", "image"] });
// });

//Send ordersData data to db:
// const data = ordersData.map(async (o) => {
//   const tempPed = await orders
//     .create(
//       o,
//       {
//         fields: ["total_price", "date", "state", "payoptions_id", "users_id"],
//       },
//       {
//         include: [{ model: products }, { model: users }],
//       }
//     )
// });

// // // //Send ordersHasProductsData data to db:
// const data1 = ordersHasProductsData.map (async ohasp =>  {
//   const tempPed= await ordersHasProducts.create(ohasp, { fields: ["quantity", "orders_id", "products_id"] });
// });