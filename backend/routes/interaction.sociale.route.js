const interactionsociales = require("../controllers/interaction.sociale.controller.js");

var router_interactionsociales = require("express").Router();

//router_publication.post("/api/publication", interactionsociales.create);
router_interactionsociales.post("/api/interaction/pointsAdd", interactionsociales.pointsAdd);
router_interactionsociales.post("/api/interaction/pointsRemove", interactionsociales.pointsRemove);
router_interactionsociales.post("/api/interaction/likesAdd", interactionsociales.likesAdd);
router_interactionsociales.post("/api/interaction/likesRemove", interactionsociales.likesRemove);

router_interactionsociales.post("/api/interaction/enregistrementAdd", interactionsociales.enregistrementAdd);
router_interactionsociales.post("/api/interaction/enregistrementRemove", interactionsociales.enregistrementRemove);


router_interactionsociales.get("/api/interaction/pointsByUserId",
     interactionsociales.getAllPointsByUserId);

     
router_interactionsociales.get("/api/interaction/likesByUserId",
     interactionsociales.getAllLikesByUserId);

router_interactionsociales.get("/api/interaction/enregistrementsByUserId",
     interactionsociales.getAllEnregistrementsByUserId);

router_interactionsociales.get("/api/interaction/pointsByPostId", interactionsociales.getAllPointsByPostId);
router_interactionsociales.get("/api/interaction/likesByPostId", interactionsociales.getAllLikesByPostId);

router_interactionsociales.get("/api/interaction/likesCount",
     interactionsociales.getLikesCountByPostId);

router_interactionsociales.get("/api/interaction/pointsCount",
     interactionsociales.getPointsCountByPostId);


router_interactionsociales.get("/api/interaction/getIfUserAlreadyLikePost",
     interactionsociales.getIfUserAlreadyLikePost);

router_interactionsociales.get("/api/interaction/getIfUserAlreadyPointPost",
     interactionsociales.getIfUserAlreadyPointPost);

router_interactionsociales.get("/api/interaction/getIfUserAlreadySavePost",
     interactionsociales.getIfUserAlreadySavePost);


module.exports = router_interactionsociales;

// interaction.sociale.route