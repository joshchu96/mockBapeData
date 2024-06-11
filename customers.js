const router = require("express").Router();
const db = require("./db");
const expressError = require("./expressError");

//GET: all customers info
router.get("/all", async (req, res) => {
  const customersResults = await db.query("SELECT * FROM Customers");
  return res.json(customersResults.rows);
});

//GET: all orders a customer has bought.
router.get("/:id/all-orders", async (req, res, next) => {
  try {
    const { id } = req.params;
    const customerRes = await db.query(
      "SELECT c.customer_id, c.customer_name, c.customer_email, o.other_order_details, p.product_name FROM Customers AS c LEFT JOIN Orders AS o ON c.customer_id = o.customer_id LEFT JOIN Products as p ON o.product_id = p.product_id WHERE c.customer_id = $1",
      [id]
    );

    if (customerRes.rows.length === 0) {
      throw new expressError("Customer not found", 404);
    }
    const { customer_id, customer_name, customer_email } = customerRes.rows[0];
    const orderedItems = customerRes.rows.map((r) => ({
      product: r.product_name,
      details: r.other_order_details,
    }));

    return res.json({
      customer_id,
      customer_name,
      customer_email,
      orderedItems,
    });
  } catch (error) {
    return next(error);
  }
});

//PATCH: Updating customers information
router.patch("/:id/update_info", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customer_name, customer_email, other_customer_details } = req.body;
    const updateRes = await db.query(
      "UPDATE Customers SET customer_name = $1, customer_email = $2, other_customer_details = $3 WHERE customer_id = $4 RETURNING *",
      [customer_name, customer_email, other_customer_details, id]
    );
    if (updateRes.rows.length === 0) {
      throw new expressError("Update did not go through", 404);
    } else {
      res.json({ updated: updateRes.rows[0] });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
