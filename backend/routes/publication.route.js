const publication = require("../controllers/publication.controller.js");

var router_publication = require("express").Router();

// Create a new User
router_publication.post("/api/publication/create", publication.create);
router_publication.post("/api/publication/edit",  publication.edit );
router_publication.post("/api/publication/delete",  publication.delete );

router_publication.get("/api/publication", publication.findAll);
router_publication.get("/api/publicationByUserId", publication.findAllPublicationByUserId);
router_publication.get("/api/publicationid", publication.findOneById);
// /:id
module.exports = router_publication;