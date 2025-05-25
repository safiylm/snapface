const publication = require("../controllers/publication.controller.js");
var router_publication = require("express").Router();

const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();
const upload = multer({ dest: 'uploads/' });


// Create a new User
router_publication.post("/api/publication/create",upload.array('photos'), publication.create);
router_publication.post("/api/publication/edit", upload.array('photos'), publication.edit );
router_publication.post("/api/publication/delete",  publication.delete );


router_publication.get("/api/publication", publication.findAll);
router_publication.get("/api/pour-moi/publication", publication.findAllPourMoi);
router_publication.get("/api/publicationByUserId", publication.findAllPublicationByUserId);
router_publication.get("/api/publicationid", publication.findOneById);
router_publication.get("/api/publication/search", publication.searchPostByTitle);
// /:id
module.exports = router_publication;

