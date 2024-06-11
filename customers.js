const router = require("express").Router();
const db = require("./db");
const expressError = require("./expressError");
const CustomersData = require("./models/customersOOP");

//GET: all customers info
router.get("/all", async (req, res) => {
  let results = await CustomersData.getAll();
  res.json(results);
});

//GET: all orders a customer has bought.
router.get("/:id/all-orders", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await CustomersData.getById(id);
    res.json(results);
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

router.post("/newCustomer", async (req, res, next) => {
  try {
    const { customer_name, customer_email, other_customer_details } = req.body;
    const newCustomer = await CustomersData.create(
      customer_name,
      customer_email,
      other_customer_details
    );
    res.json(newCustomer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await CustomersData.remove(id);
    return res.json({ message: "Customer deleted", deletedCustomer });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
