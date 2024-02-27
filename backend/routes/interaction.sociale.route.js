const interactionsociales = require("../controllers/interaction.sociale.controller.js");

var router_interactionsociales = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_interactionsociales.post("/api/interaction/social/create", interactionsociales.create);

router_interactionsociales.get("/api/interactionSocialByPostId", interactionsociales.findByPublicationId);

module.exports = router_interactionsociales;

// interaction.sociale.route