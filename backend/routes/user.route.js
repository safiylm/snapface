const user = require("../controllers/user.controller.js");

var router_user = require("express").Router();

// Create a new User

router_user.post("/api/user/create", user.create);
router_user.post("/api/user/connexion", user.connexion);
router_user.post("/api/user/update", user.update);
router_user.post("/api/user/edit/password", user.editPassword);
router_user.post("/api/user/edit/email", user.editEmail);
router_user.post("/api/user/edit/phonenumber", user.editPhoneNumber);
router_user.post("/api/user/delete", user.delete);
router_user.post("/password-oublie/email", user.sendLinkForPasswordOublie);
router_user.post("/api/user/email", user.getIfEmailExist);
router_user.post("/api/user/reinitialise/password", user.reinitialisePassword);

router_user.get("/api/user", user.findAll);

router_user.get("/api/userid", user.findOneById);
router_user.get("/api/username", user.findByName);
// /:id
module.exports = router_user;