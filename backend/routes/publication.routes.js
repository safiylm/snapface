const publication = require("../controllers/publication.controller.js");

var router_publication = require("express").Router();

// Create a new User
router_publication.post("/api/publication", publication.create);
router_publication.get("/api/publication/create", publication.create);

router_publication.get("/api/publication", publication.findAll);

router_publication.get("/api/publicationid", publication.findOneById);
// /:id
module.exports = router_publication;