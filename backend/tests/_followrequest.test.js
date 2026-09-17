
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const { assertNotInReactiveContext } = require('@angular/core');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;

const followrquest_object = {
    _id: "",
    to: "69921e85d76868f0c06e335a",
    from: "697f9866e1f4e04eaa17ccfa",
    status: 'pending',
}


test('POST create follow request', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/followrequest/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(followrquest_object)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/followrequest/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('POST accept follow request', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/followrequest/accept`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(followrquest_object)
        });
        assert.equal(responseCreateRequest.status, 200, 'Status should be 200');


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/followrequest/accept`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('POST reject follow request', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(
            `http://localhost:${port}/api/followrequest/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(followrquest_object)
        });
        assert.equal(responseCreateRequest.status, 200, 'Status should be 200');


        const responseCreateRequest_erreur = await fetch(
            `http://localhost:${port}/api/followrequest/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('GET list Of Follow Request', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(
            `http://localhost:${port}/api/listOfFollowRequest?userId=${followrquest_object.to}`);
        assert.equal(responseCreateRequest.status, 200, 'Status should be 200');

        const responseCreateRequest_withparamnull = await fetch(
            `http://localhost:${port}/api/listOfFollowRequest?userId=`);
        assert.equal(responseCreateRequest_withparamnull.status, 400, 'Status should be 200');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('GET existe deja ', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(
            `http://localhost:${port}/api/dejaEnAttente?to=${followrquest_object.to}&from=${followrquest_object.from}`);
        assert.equal(responseCreateRequest.status, 200, 'Status should be 200');

        const responseCreateRequest_withparamnull = await fetch(
            `http://localhost:${port}/api/dejaEnAttente?to=`);
        assert.equal(responseCreateRequest_withparamnull.status, 400, 'Status should be 200');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


