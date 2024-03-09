const user = require("../controllers/user.controller.js");

var router_user = require("express").Router();

// Create a new User
router_user.post("/api/user/create", user.create);
router_user.post("/api/user/connexion", user.connexion);
router_user.post("/api/user/update", user.update);


router_user.get("/api/user", user.findAll);

router_user.get("/api/userid", user.findOneById);
// /:id
module.exports = router_user;