const abonnees = require("../controllers/abonnee.controller.js");

var router_abonnees = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_abonnees.post("/api/abonnees/create", abonnees.create);
router_abonnees.post("/api/abonnees/remove", abonnees.remove);

router_abonnees.get("/api/abonnement", abonnees.findAbonnementByUserId);
router_abonnees.get("/api/followers", abonnees.findFollowersByUserId);
router_abonnees.get("/api/checkabonnement", abonnees.checkAbonnement);


module.exports = router_abonnees;


