
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const { assertNotInReactiveContext } = require('@angular/core');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;

//("/api/user/edit/password", user_.editPassword);

//get("/api/user/edit/email", user_.editEmail);
//("/api/user/edit/email/confirmation", user_.sendConfiramtionEmailForNewEmail);

//("/api/user/edit/phonenumber", user_.editPhoneNumber);
//("/password-oublie/send-reinit-link-by-email", user_.sendLinkForReInitPasswordOublie);
////("/api/user/email", user.getIfEmailExist);
//("/api/user/reinitialise/password", user_.reinitialisePassword);
//("/api/user/edit/userphoto",upload.single('image'),  user_.editUserPhoto);

//("/api/user/edit/online", user_.updateIsOnline);
