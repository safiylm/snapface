const statistiqueusers = require("../controllers/statistique.user.controller.js");

var router_publication = require("express").Router();

// Create a new statistique User
router_publication.get("/api/statistiqueUser/create", statistiqueusers.create);

router_publication.get("/api/statistiqueUserByUserId", statistiqueusers.findByUserId);


module.exports = router_publication;