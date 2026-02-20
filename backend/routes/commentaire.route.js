const commentaires = require("../controllers/commentaire.controller.js");

var router_commentaires = require("express").Router();

// Create a new Comment
router_commentaires.post("/api/commentaire/create", commentaires.create);

router_commentaires.get("/api/commentairesByPostId", commentaires.findByPostId);
router_commentaires.post("/api/commentaire/delete", commentaires.delete);
router_commentaires.post("/api/commentaire/update", commentaires.update);


module.exports = router_commentaires;
