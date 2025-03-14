const message = require("../controllers/message.controller.js");

var router_message = require("express").Router();

// Create 
router_message.post("/message/create", message.createMessage);
router_message.post("/conversation/create", message.createConversation);
router_message.post("/message/markasseen", message.markAsSeen);

//GET
router_message.get("/messages", message.getMessages);
router_message.get("/conversations", message.getConversationsByUserId);


// /:id
module.exports = router_message;