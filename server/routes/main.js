const router = require("express").Router();
const server = require("../server");
const pool = server.getPool();

/* GET This endpoint gets all of the users associated companies.  If there are 
   no companies in the database it will return a 404 error. */

router.get("/api/companies", (req, res) => {
  pool.query("SELECT * FROM companies", function(error, results, fields) {
    if (error) {throw error}
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send("No companies found.");
    }
  });
});

/* POST This endpoint inserts a new company into the database.  The company info
   must be supplied in the body of the request in JSON format.  It returns the body of the
   request upon success.  If the company is not added to the database returns a 404 error */

router.post("/api/companies", (req, res) => {
  const sql = `INSERT into companies VALUES 
    (NULL, 
    "${req.body.companyName}", 
    "${req.body.logoUrl}", 
    "${req.body.city}", 
    "${req.body.state}", 
    UNIX_TIMESTAMP(), 
    UNIX_TIMESTAMP())`
  pool.query(sql, function(error, results, fields) {
    if (error) throw error;
    if (results) {
      res.json(req.body);
    } else {
      res.status(404).send("Company was not added");
    }
  });
});

/* GET This endpoint gets a specific company based on a supplied company ID.  If there are 
   no companies matching the ID in the database it will return a 404 error. */

router.get("/api/companies/:id", (req, res) => {
  const companyId = req.params.id;
  const sql = "SELECT * FROM companies WHERE companyId = ?";
  pool.query(sql, companyId, function(error, results, fields) {
    if (error) throw error;
    // Check for no results.
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send("CompanyId not found.");
    }
  });
});

/* DELETE This endpoint deletes a specific company based on a supplied company ID.  If there are 
   no companies matching the ID in the database it will return a 404 error. */

router.delete("/api/companies/:id", (req, res) => {
  const companyId = req.params.id;
  const sql = "DELETE FROM companies WHERE companyId = ?";
  pool.query(sql, companyId, function(error, results, fields) {
    if (error) throw error;
    // Check for no results.
    if (results.affectedRows !== 0) {
      res.json(results);
    } else {
      res.status(404).send("That companyId is not in the database");
    }
  });
});

/* GET This endpoint gets all of the users associated deals.  If there are 
   no deals in the database it will return a 404 error. */

router.get("/api/deals", (req, res) => {
  pool.query("SELECT * FROM deals", function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

/* GET This endpoint gets a specific deal based on a supplied deal ID.  If there are 
   no deals matching the ID in the database it will return a 404 error. */

router.get("/api/deals/:id", (req, res) => {
  const dealId = req.params.id;
  const sql = "SELECT * FROM deals WHERE companyId = ?";
  pool.query(sql, dealId, function(error, results, fields) {
    if (error) throw error;
    // Check for no results.
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send("DealId not found.");
    }
  });
});

/* DELETE This endpoint deletes a specific deal based on a supplied deal ID.  If there are 
   no deals matching the ID in the database it will return a 404 error. */

router.delete("/api/deals/:id", (req, res) => {
  const dealId = req.params.id;
  const sql = "DELETE FROM deals WHERE dealId = ?";
  pool.query(sql, dealId, function(error, results, fields) {
    if (error) throw error;
    // Check for no results.
    if (results.affectedRows !== 0) {
      res.json(results);
    } else {
      res.status(404).send("That dealId is not in the database");
    }
  });
});

/*PUT This endpoint allows you to edit and field for any indidual company. If the company
  is not edited than it will return a 404 error */
router.put("/api/companies/:id", (req, res) => {
  const companyId = parseInt(req.params.id);
  const sql = `UPDATE companies SET 
    companyName = '${req.body.companyName}',
    logoUrl = '${req.body.logoUrl}',
    city = '${req.body.city}',
    state = '${req.body.state}',
    updatedDate = '${req.body.updatedDate}'
    WHERE companyId = ?`
  pool.query(sql, companyId, function(error, results, fields){
    if (error) throw error;
    if (results.affectedRows !== 0) {
      res.json(results);
    } else {
      res.status(404).send("The company was not edited");
    }
  });
});

/*PUT This endpoint allows you to edit a field for any deal. If the deal
  is not edited than it will return a 404 error */
  router.put("/api/deals/:id", (req, res) => {
    const dealId = parseInt(req.params.id);
    const sql = `UPDATE deals SET
      dealName = '${req.body.dealName}',
      stage = '${req.body.stage}',
      amount = '${req.body.amount}',
      closeDate = '${req.body.closeDate}',
      companyId = '${req.body.companyId}'
      WHERE dealId = ?`
    pool.query(sql, dealId, function(error, results, fields){
      if (error) throw error;
      if (results.affectedRows !== 0) {
        res.json(results);
      } else {
        res.status(404).send("The deal was not edited");
      }
    });
  });

/* POST This endpoint inserts a new deal into the database.  The deal info
   must be supplied in the body of the request in JSON format.  It returns the body of the
   request upon success.  If the deal is not added to the database returns a 404 error */

router.post("/api/deals", (req, res) => {
  const sql = `INSERT into deals VALUES
    (NULL,
    "${req.body.dealName}",
    "${req.body.stage}",
    "${req.body.amount}",
    "${req.body.createdDate}",
    "${req.body.closeDate}",
    "${req.body.companyId}")`
  pool.query(sql, function(error, results, fields) {
    if (error) throw error;
    if (results) {
      res.json(req.body);
    } else {
      res.status(404).send("Deal was not added");
    }
  });
});

module.exports = router;