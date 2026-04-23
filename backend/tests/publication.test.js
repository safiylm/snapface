// publicationService.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;

const post = {
    _id: "",
    body: "Paris, la capitale.",
    userId: "662eb2a1c2fd9ad3238d7528",
    assets: [],
    date: Date.now(),
    commentsCount: 0,
    likesCount: 0,
    repostsCount: 0,
    savesCount: 0
};

// edit post reste a faire 

test('POST create post', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        const responseCreateRequest = await fetch(`http://localhost:${port}/api/publication/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');
        const post_ = await responseCreateRequest.json()
        post._id = post_.postId


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/abonnees/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": "", "body": ""
            })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


//notFoundResponse not finish 
test('GET /api/publication returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/publication`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.notEqual(posts.length, 0, "list posts is not null");

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
        const response = await fetch(`http://localhost:${port}/api/pour-moi/publication?userId=${post.userId}`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.notEqual(posts.length, 0, "list posts is not null");

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
        const url = `http://localhost:${port}/api/publicationByUserId?id=${post.userId}`
        // Make request to our API
        const response = await fetch(url);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.equal(posts[0].body, post.body)



        const response_paramnull = await fetch(`http://localhost:${port}/api/publicationByUserId?id=`);
        assert.equal(response_paramnull.status, 400, 'Status should be 400');

        // Test not found case
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})




test('GET /api/publicationid returns correct a post', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        const url = `http://localhost:${port}/api/publicationid?id=${post._id}`
        // Make request to our API
        const response = await fetch(url);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.equal(posts.body, post.body)

        const response_paramnull = await fetch(`http://localhost:${port}/api/publicationid?id=`);
        assert.equal(response_paramnull.status, 400, 'Status should be 400');


        // // Test not found case
        // const notFoundResponse = await fetch(`http://localhost:${port}/api/publicationid?id=699216bbd76868f0c06e334d`);
        // assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

test('GET /api/publication/search returns correct list of posts', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/publication/search?name=Paris`);
        assert.equal(response.status, 200, 'Status should be 200');

        const posts = await response.json();
        assert.equal(posts[0].body, post.body)

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/publication/search?name=ecehc`);
        assert.equal(notFoundResponse.status, 404, 'Status should be 404');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


/*
test('POST edit post', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseEditRequest = await fetch(`http://localhost:${port}/api/publication/edit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": post._id, "existingAssets": [], "body": "Paris, c'est merveilleux." })
        });
        assert.equal(responseEditRequest.status, 200, 'Status should be 200');

        const useredited = await responseEditRequest.json();
        assert.equal(useredited.message, "Modification réussie", "le nom a bien ete modifié")

        const responseEditRequest_erreur = await fetch(`http://localhost:${port}/api/publication/edit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": "", "body": "" })
        });
        assert.equal(responseEditRequest_erreur.status, 400, 'Status should be 400');


    }
    finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }

});
*/


test('POST remove post', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseRemoveRequest = await fetch(`http://localhost:${port}/api/publication/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": post._id })
        });
        assert.equal(responseRemoveRequest.status, 200, 'Status should be 200');

        const responseRemoveRequest_erreur = await fetch(`http://localhost:${port}/api/publication/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": ""})
        });
        assert.equal(responseRemoveRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})