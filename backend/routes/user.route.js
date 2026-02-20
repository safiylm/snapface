const user = require("../controllers/user.controller.js");
var router_user = require("express").Router();

const multer = require('multer');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();
const upload = multer({ dest: 'uploads/' });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// Create a new User

router_user.get("/api/user", user.findAll);

router_user.get("/api/userid", user.findOneById);
router_user.get("/api/username", user.findByName);
router_user.get("/logout", user.logout);

router_user.post("/api/user/create", user.create);
router_user.post("/api/user/connexion", user.connexion);
router_user.post("/api/user/update", user.update);
router_user.post("/api/user/edit/password", user.editPassword);

router_user.get("/api/user/edit/email", user.editEmail);
router_user.post("/api/user/edit/email/confirmation", user.sendConfiramtionEmailForNewEmail);

router_user.post("/api/user/edit/phonenumber", user.editPhoneNumber);
router_user.post("/api/user/delete", user.delete);
router_user.post("/password-oublie/send-reinit-link-by-email", user.sendLinkForReInitPasswordOublie);
//router_user.post("/api/user/email", user.getIfEmailExist);
router_user.post("/api/user/reinitialise/password", user.reinitialisePassword);
router_user.post("/api/user/edit/userphoto",upload.single('image'),  user.editUserPhoto);

router_user.post("/api/user/edit/online", user.updateIsOnline);

// /:id
module.exports = router_user;