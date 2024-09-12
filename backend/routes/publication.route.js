const publication = require("../controllers/publication.controller.js");

var router_publication = require("express").Router();

// Create a new User
router_publication.post("/api/publication/create",  function(req, res){publication.create });


router_publication.post("/api/publication/edit",  function(req, res){ publication.edit } );
router_publication.post("/api/publication/delete",  function(req, res){ publication.delete} );
router_publication.get("/api/publication",  function(req, res){publication.findAll});
router_publication.get("/api/publicationByUserId",  function(req, res){publication.findAllPublicationByUserId});
router_publication.get("/api/publicationByPostId",  function(req, res){publication.findAllPublicationByPostId});

router_publication.get("/api/publicationid",  function(req, res){publication.findOneById});
// /:id
module.exports = router_publication;