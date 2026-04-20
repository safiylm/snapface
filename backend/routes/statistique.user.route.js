const statistiqueusers = require("../controllers/statistique.user.controller.js");
var router_publication = require("express").Router();


router_publication.get("/api/statistiqueUserByUserId", statistiqueusers.findByUserId);


module.exports = router_publication;