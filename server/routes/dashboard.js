const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const validate = require("../middleware/validate");

//all todos and name

router.get("/", authorize, async (req, res) => {
  try {

    const user = await pool.query(
      //"SELECT * FROM products",
      "SELECT u.user_name FROM users AS u WHERE u.user_id = $1",
      [req.user.id]
      
    );

    res.json(user.rows);
    // console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/products", async (res) => {
// router.get("/products",authorize, async (res) => {
  try {

    const products = await pool.query(
      "SELECT * FROM products",
    );

    res.json(products.rows);
    
  } catch (err) {
    console.error(err.message);
    //res.status(500).send("Server error");
  }
});

//create a product

router.post("/products", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { product_name, product_description, image, category_id } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO products ( product_name, product_description, product_image, category_id ) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_name, product_description, image, category_id]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a product

router.put("/products/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, image } = req.body;
    const updateTodo = await pool.query(
      // "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      "UPDATE products SET product_name = $1, product_description = $2, category_id = $3, product_image = $4 WHERE product_id = $5 RETURNING *",
      [name, description, category, image, id]
    );

    // if (updateTodo.rows.length === 0) {
    //   return res.json("This todo is not yours");
    // }

    res.json("Product was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/products/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [id]
    );

    res.json("Product was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
