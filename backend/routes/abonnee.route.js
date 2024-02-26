const abonnees = require("../controllers/abonnee.controller.js");

var router_abonnees = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_abonnees.get("/api/abonnees/create", abonnees.create);

router_abonnees.get("/api/abonneesbyUserId", abonnees.findByUserId);

module.exports = router_abonnees;
