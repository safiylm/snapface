const user = require("../controllers/user.controller.js");

var router = require("express").Router();

// Create a new User
router.post("/api/user", user.create);

router.get("/api/user", user.findAll);

router.get("/api/userid", user.findOneById);
// /:id
module.exports = router;