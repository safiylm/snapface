// user Commentaire.test.js

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const { assertNotInReactiveContext } = require('@angular/core');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
const comment_object= { _id:"",
    text:"test 123"+Date.now() , userId:"662eb2a1c2fd9ad3238d7528" ,
     postId: "69e9c4ddd39665387c10a1b3"}

test('POST create comment', async () => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/commentaire/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment_object)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');
        const comment = await responseCreateRequest.json()
        comment_object._id = comment.commentaire.insertedId
   

        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/commentaire/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('POST edit comment', async () => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        comment_object.text= "TEST 12345"
        const responseCreateRequest = await fetch(`http://localhost:${port}/api/commentaire/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment_object)
        });
        assert.equal(responseCreateRequest.status, 200, 'Status should be 201');


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/commentaire/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


///api/commentairesByPostId

// notFoundResponseNOT WORKING
test('GET /api/commentairesByPostId returns les commentaires du post', async () => {
    await new Promise(resolve => server.listen(0, resolve));
    const url = `http://localhost:${port}/api/commentairesByPostId`
    try {
        // Make request to our API
        const response = await fetch(url+ `?id=${comment_object.postId}` );
        assert.equal(response.status, 200, 'Status should be 200');

        const paramNull = await fetch(url + `?id=`);
        assert.equal(paramNull.status, 400, 'Status should be 400, param is null');

   } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

test('POST delete comment', async () => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/commentaire/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment_object)
        });
        assert.equal(responseCreateRequest.status, 200, 'Status should be 200');


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/commentaire/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

