const interactionsociales = require("../controllers/interaction.sociale.controller.js");

var router_interactionsociales = require("express").Router();

router_interactionsociales.post("/api/interaction/add",
     interactionsociales.interactionAdd);

router_interactionsociales.post("/api/interaction/remove",
     interactionsociales.interactionRemove);

router_interactionsociales.get("/api/interaction/exist",
     interactionsociales.interactionsExist);

router_interactionsociales.get("/api-interaction-by-userId",
     interactionsociales.getAllInteractionsByUserId);

     
router_interactionsociales.get("/api/interaction/likesByPostId", interactionsociales.getAllLikesByPostId);

router_interactionsociales.get("/api/interaction/likesCount",
     interactionsociales.getLikesCountByPostId);


module.exports = router_interactionsociales;
