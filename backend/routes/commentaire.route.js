const commentaires = require("../controllers/commentaire.controller.js");

var router_commentaires = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_commentaires.get("/api/commentaire/create", commentaires.create);

router_commentaires.get("/api/commentairesByPostId", commentaires.findByPublicationId);

module.exports = router_commentaires;
