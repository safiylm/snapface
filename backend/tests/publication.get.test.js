// publicationService.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;

// /api/pour-moi/publication", .findAllPourMoi
// /api/publicationByUserId", .findAllPublicationByUserId


//notFoundResponse not finish 
test('GET /api/publication returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/publication`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.deepStrictEqual(posts[1], {
            _id: '69921d7fd76868f0c06e3358',
            body: '.',
            userId: '662eb2a1c2fd9ad3238d7528',
            assets: [
                'https://res.cloudinary.com/dx99ggqy1/image/upload/v1771183486/uploads_secure/oro1jemvjchaeibdilyd.jpg'
            ],
            date: 1771183487130,
            commentsCount: 0,
            likesCount: 2,
            repostsCount: 2,
            savesCount: 0
        }, "post should identique");

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/publication`);
        //  assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


//assets posts not finish
//notFoundResponse not finish 
test('GET /api/pour-moi/publication returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/pour-moi/publication?userId=69921e85d76868f0c06e335b`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        /* console.log(posts[0])
         assert.deepStrictEqual(posts[0],
             { }
             , "post should identique");
        */
        // Test not found case
        // const notFoundResponse = await fetch(`http://localhost:${port}/api/pour-moi/publication?userid=69951e85d76868f0c06e335a`);
        //  assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


//assets posts not finish
//notFoundResponse not finish 
test('GET /api/publicationByUserId returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/publicationByUserId?id=69921e85d76868f0c06e335b`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        // console.log(posts[0])

        /* assert.strictEqual(posts[0],
             {
             }, "post should identique");
 */
        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/publicationByUserId?id=69921e85d76868f0c06e335a`);
        // assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


// /api/publicationid", .findOneById


test('GET /api/publicationid returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/publicationid?id=699216bbd76868f0c06e334c`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.deepStrictEqual(posts,
            {
                _id: '699216bbd76868f0c06e334c',
                body: '....',
                userId: '697f9866e1f4e04eaa17ccfd',
                assets: [
                    'https://res.cloudinary.com/dx99ggqy1/image/upload/v1771181754/uploads_secure/c3ukmrbnvyuaule0eof7.png'
                ],
                date: 1771181755454,
                commentsCount: 0,
                likesCount: 0,
                repostsCount: 0,
                savesCount: 0
            }, "post should identique");

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/publicationid?id=699216bbd76868f0c06e334d`);
        assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

// /api/publication/search" 

//assets posts not finish
//notFoundResponse not finish 
test('GET /api/publication/search returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/publication/search?name=MOTIVATION`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();

        /* assert.strictEqual(posts[0],
             {
             }, "post should identique");
 */
        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/publication/search?name=ecehc`);
         assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})