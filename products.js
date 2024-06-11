const router = require("express").Router();
const db = require("./db");

//GET: returns all the products from bape store.
router.get("/all", async (req, res) => {
  let results = await db.query("SELECT * FROM Products");
  res.json(results.rows);
});

//GET: return specifc product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productResult = await db.query(
      "SELECT * FROM products WHERE product_id = $1 ",
      [id]
    );
    if (productResult.rows.length === 0) {
      console.error("ID of product is not in the database.");
    } else {
      res.json(productResult.rows[0]);
    }
  } catch (error) {
    console.error("500 Server error. Generalized Error");
  }
});

module.exports = router;
