const message = require("../controllers/message.controller.js");

var router_message = require("express").Router();

// Create 
router_message.post("/message/create", message.create);

//GET
router_message.get("/messages", message.find);

// /:id
module.exports = router_message;