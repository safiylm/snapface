const notification = require("../controllers/notification.controller.js");

var router_notification = require("express").Router();

router_notification.post("/api/notfication/create", notification.create);

router_notification.get("/api/notfications", notification.getNotificationByUserId);


module.exports = router_notification;
