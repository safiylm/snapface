const signalement = require("../controllers/signalement.controller.js");

var router_signalement = require("express").Router();

router_signalement.post("/create/signalement/user", signalement.signalerUnUser);
router_signalement.post("/create/signalement/post", signalement.signalerUnePublication);

router_signalement.get("/signalement/allpost", signalement.getAllPostsSignale);
router_signalement.get("/signalement/alluser", signalement.getAllUsersSignale);
router_signalement.get("/signalement/allpostByAuteur", signalement.getAllPostsSignaleByAuteur);
router_signalement.get("/signalement/alluserByAuteur", signalement.getAllUsersSignaleByAuteur);


module.exports = router_signalement;


