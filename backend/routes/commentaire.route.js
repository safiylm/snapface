const commentaires = require("../controllers/commentaire.controller.js");

var router_commentaires = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_commentaires.post("/api/commentaire/create", commentaires.create);

router_commentaires.get("/api/commentairesByPostId", commentaires.findByPublicationId);
router_commentaires.post("/api/commentaire/delete", commentaires.delete);
router_commentaires.post("/api/commentaire/update", commentaires.update);
router_commentaires.post("/api/commentaire/checktotal", commentaires.checkTotalComments);


module.exports = router_commentaires;
