// user Statistique.test.js

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;


test('GET /api/statistiqueUserByUserId returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/statistiqueUserByUserId?id=69921e85d76868f0c06e335b`);
        assert.equal(response.status, 200, 'Status should be 200');

        const stat = await response.json();
        assert.deepStrictEqual(stat, { "_id": "69921e85d76868f0c06e335c", "userId": "69921e85d76868f0c06e335b", "followers": 1, "totalPosts": 1, "totalPoints": 0 }, "post should identique");

        const paramNull = await fetch(`http://localhost:${port}/api/statistiqueUserByUserId?id=`);
        assert.equal(paramNull.status, 400, 'Status should be 500, param is null');

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/statistiqueUserByUserId?id=662eb2a1c2fd9ad3238d7521`);
        assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})