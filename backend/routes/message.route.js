const message = require("../controllers/_message.controller.js");

var router_message = require("express").Router();

// post 
router_message.post("/message/create", message.createMessage);
router_message.post("/conversation/create", message.createConversationWithFirstMessage);
router_message.post("/message/edit", message.editMessage);
router_message.post("/message/delete", message.deleteMessage);
router_message.post("/conversation/delete", message.deleteConversation);
router_message.post("/message/markasseen", message.markAsSeen);


//GET
router_message.get("/messages", message.getAllMessagesByConversationId);
router_message.get("/conversations", message.getAllConversationsByUserId);
router_message.get("/conversation", message.getConversationById);


///////////////////////////////////

router_message.get("/test", message.getAllConversations);
router_message.get("/last-message", message.getLastMessage);
router_message.get("/conversation/nbnewmsj", message.getNewMessagesByConversationId);

module.exports = router_message;