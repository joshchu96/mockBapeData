//practicing OOP static methods for cleaner code in my routes.
const db = require("../db");
const expressError = require("../expressError");

class CustomersData {
  static async getAll() {
    let CustomersResults = await db.query("SELECT * FROM Customers");
    return CustomersResults.rows;
  }

  static async getById(id) {
    let CustomerResults = await db.query(
      `SELECT c.customer_id, c.customer_name, c.customer_email, o.other_order_details, p.product_name 
    FROM Customers AS c 
    LEFT JOIN Orders AS o ON c.customer_id = o.customer_id 
    LEFT JOIN Products as p ON o.product_id = p.product_id 
    WHERE c.customer_id = $1`,
      [id]
    );

    if (CustomerResults.rows.length === 0) {
      throw new expressError("Customer not found", 404);
    }

    const { customer_id, customer_name, customer_email } =
      CustomerResults.rows[0];
    const orderedItems = CustomerResults.rows.map((r) => ({
      product: r.product_name,
      details: r.other_order_details,
    }));
    let resultsObj = {
      customer_id,
      customer_name,
      customer_email,
      orderedItems,
    };
    return resultsObj;
  }

  static async create(customer_name, customer_email, other_customer_details) {
    if (!customer_name || customer_email) {
      throw new expressError("Missing required data", 404);
    }
    const results = await db.query(
      `INSERT INTO Customers (customer_name, customer_email, other_customer_details)
        VALUES 
        ($1,$2,$3)
        RETURNING *`,
      [customer_name, customer_email, other_customer_details]
    );
    return results.rows[0];
  }

  static async remove(id) {
    const removeUser = await db.query(
      "DELETE FROM Customers WHERE customer_id = $1 RETURNING *",
      [id]
    );
    return removeUser.rows[0];
  }
}

module.exports = CustomersData;
