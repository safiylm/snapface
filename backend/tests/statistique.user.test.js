// user Statistique.test.js

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
const newUser = {
    name: "Test User stat",
    email: "test123@mail.com",
    password: "Test123+",
    phoneNo: 12345678
};

//
// CREATE STAT WITH CREATE USER
// GET STAT BY USERID 
// DELETE STAT WITH DELETE USER 
//

test('GET /api/statistiqueUserByUserId returns  stat of user ', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/user/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');

        const createdUser = await responseCreateRequest.json();
        userid = createdUser.userId
        assert.equal(createdUser.message, "Inscription réussie");
        assert.ok(createdUser.userId, 'User should have an id');


        // Make request to our API
        const url = `http://localhost:${port}/api/statistiqueUserByUserId?id=` + userid
        const response = await fetch(url)
        assert.equal(response.status, 200, 'Status should be 200');

        const stat = await response.json();
        assert(stat.userId, userid)
        assert.notEqual(stat._id, null, "user stat id not null")
        assert.equal(stat.totalPosts, 0, "total post od user is 0")

        const paramNull = await fetch(`http://localhost:${port}/api/statistiqueUserByUserId?id=`);
        assert.equal(paramNull.status, 400, 'Status should be 400, param is null');


        const responseDeleteRequest = await fetch(`http://localhost:${port}/api/user/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": userid })
        });

        assert.equal(responseDeleteRequest.status, 200, 'Status should be 200');


        const response2 = await fetch(url)
        assert.equal(response2.status, 404, 'Status should be 404');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})