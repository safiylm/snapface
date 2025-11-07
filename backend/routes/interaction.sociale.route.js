const interactionsociales = require("../controllers/interaction.sociale.controller.js");

var router_interactionsociales = require("express").Router();

router_interactionsociales.post("/api/interaction/add",
     interactionsociales.interactionAdd);

router_interactionsociales.post("/api/interaction/remove",
     interactionsociales.interactionRemove);


router_interactionsociales.get("/api/interaction/exist",
     interactionsociales.interactionsExist);



router_interactionsociales.get("/api/interaction/likesByUserId",
     interactionsociales.getAllLikesByUserId);

router_interactionsociales.get("/api/interaction/enregistrementsByUserId",
     interactionsociales.getAllEnregistrementsByUserId);

router_interactionsociales.get("/api/interaction/repostsByUserId",
     interactionsociales.getAllRepostsByUserId);


router_interactionsociales.get("/api/interaction/likesByPostId", interactionsociales.getAllLikesByPostId);

router_interactionsociales.get("/api/interaction/likesCount",
     interactionsociales.getLikesCountByPostId);


module.exports = router_interactionsociales;
