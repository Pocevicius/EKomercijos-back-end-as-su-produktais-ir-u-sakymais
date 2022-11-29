const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/insertProduct", async (req, res) => {
  try {
    await db.query(`INSERT INTO public.products(
        id, title, image, price)
        VALUES (${req.body.id}, '${req.body.title}', '${req.body.image}', ${req.body.price})`);
    return res
      .status(200)
      .json({ status: "Product was inserted successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});

app.get("/getAllProducts", async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products");

    res.status(200).json({ products: products.rows });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getOneProductById/:id", async (req, res) => {
  try {
    const products = await db.query(
      `SELECT * FROM products WHERE Id='${req.params.id}'`
    );

    res.status(200).json({ products: products.rows });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getOrderById/:id", async (req, res) => {
  try {
    const order = await db.query(
      `SELECT orders.id, orders.customer_name, orders.customer_email, products.title, products.image, products.price

        FROM orders

        FULL JOIN cart ON cart.order_id = orders.id

        FULL JOIN products ON cart.product_id = products.id

        WHERE orders.id = '${req.params.id}'`
    );

    res.status(200).json({ order: order.rows });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Connected");
});
