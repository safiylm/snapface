const abonnees = require("../controllers/abonnee.controller.js");

var router_abonnees = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_abonnees.post("/api/abonnees/create", abonnees.create);
router_abonnees.post("/api/abonnees/add", abonnees.abonneeAdd);
router_abonnees.post("/api/abonnees/remove", abonnees.abonneeRemove);

router_abonnees.get("/api/abonneesbyUserId", abonnees.findByUserId);
router_abonnees.get("/api/post/myabonnement", abonnees.findPostOfMyAbonnement);


module.exports = router_abonnees;


