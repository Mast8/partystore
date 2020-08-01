const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.get("/products", async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
        "SELECT * from products"
    );
    //console.log(user.rows );
    res.json(user.rows);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
