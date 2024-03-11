const abonnees = require("../controllers/abonnee.controller.js");

var router_abonnees = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_abonnees.post("/api/abonnees/create", abonnees.create);
router_abonnees.post("/api/abonnees/abonneeAdd", abonnees.abonneeAdd);
router_abonnees.post("/api/abonnees/abonneeRemove", abonnees.abonneeRemove);

router_abonnees.get("/api/abonneesbyUserId", abonnees.findByUserId);

module.exports = router_abonnees;


