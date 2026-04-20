// user Abonnee.test.js

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const { assertNotInReactiveContext } = require('@angular/core');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
const abonnement_object = { "userId": "69921e85d76868f0c06e335b", "follows": "697f9866e1f4e04eaa17ccfd" }


test('POST create abonnement', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/abonnees/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(abonnement_object)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');
        const abonement = await responseCreateRequest.json()


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/abonnees/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "userId": "", "follows": "" })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



// notFoundResponseNOT WORKING
test('GET /api/abonnement returns les abonnements du user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    const url = `http://localhost:${port}/api/abonnement`
    try {
        // Make request to our API
        const response = await fetch(url + '?id=' + abonnement_object.userId);
        assert.equal(response.status, 200, 'Status should be 200');

        const result = await response.json();
        assert.notEqual(result.length, 0)

        const paramNull = await fetch(url + `?id=`);
        assert.equal(paramNull.status, 400, 'Status should be 500, param is null');

        // Test not found case
        //  const notFoundResponse = await fetch(url +`?id=662eb2a1c2fd9ad3238d7521`);
        //  assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

// notFoundResponseNOT WORKING
test('GET /api/followers returns les folloowers du user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    const url = `http://localhost:${port}/api/followers`
    try {
        // Make request to our API
        const response = await fetch(url + '?id=' + abonnement_object.follows);
        assert.equal(response.status, 200, 'Status should be 200');

        const result = await response.json();
        assert.notEqual(result.length, 0)

        const paramNull = await fetch(url + `?id=`);
        assert.equal(paramNull.status, 400, 'Status should be 500, param is null');

        // Test not found case
        //  const notFoundResponse = await fetch(url +`?id=662eb2a1c2fd9ad3238d7521`);
        //  assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


// notFoundResponseNOT WORKING
test('GET /api/checkabonnement returns les abonnements du user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    const url = `http://localhost:${port}/api/checkabonnement`
    try {
        // Make request to our API
        const response = await fetch(url + "?userId=" +
        abonnement_object.userId + "&follows=" + abonnement_object.follows);
        assert.equal(response.status, 200, 'Status should be 200');

        //  const stat = await response.json();
        //  assert.deepStrictEqual(stat, [] , "data should identique");

        const paramNull = await fetch(url + `?userId=&follows=`);
        assert.equal(paramNull.status, 400, 'Status should be 500, param is null');

        // Test not found case
        //  const notFoundResponse = await fetch(url +`?id=662eb2a1c2fd9ad3238d7521`);
        //  assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('POST remove abonnement', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseRemoveRequest = await fetch(`http://localhost:${port}/api/abonnees/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(abonnement_object)
        });
        assert.equal(responseRemoveRequest.status, 200, 'Status should be 201');

        const responseRemoveRequest_erreur = await fetch(`http://localhost:${port}/api/abonnees/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "userId": "", "follows": "" })
        });
        assert.equal(responseRemoveRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})