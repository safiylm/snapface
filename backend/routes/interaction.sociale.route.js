const interactionsociales = require("../controllers/_interaction.sociale.controller.js");

var router_interactionsociales = require("express").Router();



router_interactionsociales.post("/api/interaction/add", interactionsociales.interactionAdd);

router_interactionsociales.post("/api/interaction/remove", interactionsociales.interactionRemove);

router_interactionsociales.get("/api/interaction/exist", interactionsociales.interactionsExist);

router_interactionsociales.get("/api-interaction-by-userId", interactionsociales.getAllInteractionsByUserId);
     
router_interactionsociales.get("/api/interaction/by-postId-type", interactionsociales.getInteractionsByPostIdAndTypeI);

router_interactionsociales.get("/api/interaction/count", interactionsociales.getInteractionsCountByPostId);


module.exports = router_interactionsociales;
