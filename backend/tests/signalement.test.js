// signalement.test.js

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
let object_signalement = {
    _id: "",
    auteur: "662eb2a1c2fd9ad3238d7528",
    raison: "TEST : Contenu inapproprié",
    postId: "69e9c4ddd39665387c10a1b3", //Signale un post 
    userId: null, //Signale un user 
}

test('POST create signalerUnePublication', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(
            `http://localhost:${port}/create/signalement/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object_signalement)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');
        let signalmt = await responseCreateRequest.json()
        object_signalement._id = signalmt.insertedId


        const responseRemoveRequest = await fetch(
            `http://localhost:${port}/signalement/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": object_signalement._id })
        });
        assert.equal(responseRemoveRequest.status, 200, 'Status should be 200');


        const responseCreateRequest_erreur = await fetch(
            `http://localhost:${port}/create/signalement/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "userId": "" })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        await new Promise(resolve => server.close(resolve));
    }
})



test('POST create signalerUnePublication', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        object_signalement.postId = ""
        object_signalement.userId = "662eb361c2fd9ad3238d752a"
        const responseCreateRequest = await fetch(
            `http://localhost:${port}/create/signalement/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object_signalement)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');
        let signalmt = await responseCreateRequest.json()
        object_signalement._id = signalmt.insertedId


        const responseCreateRequest_erreur = await fetch(
            `http://localhost:${port}/create/signalement/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "userId": "" })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        await new Promise(resolve => server.close(resolve));
    }
})


test('GET /signalement/allpost returns correct list of signalements', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/signalement/allpost`);
        assert.equal(response.status, 200, 'Status should be 200');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('GET /signalement/alluser returns correct list of signalements', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/signalement/alluser`);
        assert.equal(response.status, 200, 'Status should be 200');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


// notFoundResponseNOT WORKING
test('GET /signalement/allpostByAuteur returns correct list of signalements', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(
            `http://localhost:${port}/signalement/allpostByAuteur?auteur=${object_signalement.auteur}`);
        assert.equal(response.status, 200, 'Status should be 200');


        const paramnull = await fetch(
            `http://localhost:${port}/signalement/allpostByAuteur?auteur=`);
        assert.equal(paramnull.status, 400, 'Status should be 400, param is null');

        // const notFoundResponse = await fetch(`http://localhost:${port}/signalement/allpostByAuteur?auteur=69921e85d76868f0c06e335c`);
        // assert.equal(notFoundResponse.status, 404, 'Status should be 404');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

// notFoundResponseNOT WORKING
test('GET /signalement/alluserByAuteur returns correct list of signalements', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/signalement/alluserByAuteur?auteur=${object_signalement.auteur}`);
        assert.equal(response.status, 200, 'Status should be 200');


        const paramnull = await fetch(`http://localhost:${port}/signalement/alluserByAuteur?auteur=`);
        assert.equal(paramnull.status, 400, 'Status should be 400, param is null');

        // Test not found case
        //  const notFoundResponse = await fetch(`http://localhost:${port}/signalement/alluserByAuteur?auteur=eQSWXCCCCCCCCVCCVVB`);
        // assert.equal(notFoundResponse.status, 404, 'Status should be 404');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('POST remove signalement', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseRemoveRequest = await fetch(
            `http://localhost:${port}/signalement/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": object_signalement._id })
        });
        assert.equal(responseRemoveRequest.status, 200, 'Status should be 200');

        const responseRemoveRequest_erreur = await fetch(
            `http://localhost:${port}/signalement/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": "" })
        });
        assert.equal(responseRemoveRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})