const followrequest = require("../controllers/followrequest.controller.js");

var router_followrequest = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_followrequest.post("/api/followrequest/create", followrequest.create);
router_followrequest.post("/api/followrequest/accept", followrequest.accept);
router_followrequest.post("/api/followrequest/reject", followrequest.reject);

router_followrequest.get("/api/listOfFollowRequest", followrequest.getListOfFollowRequestByUserId);
router_followrequest.get("/api/dejaEnAttente", followrequest.dejaEnAttente);


module.exports = router_followrequest;
