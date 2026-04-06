
// userService.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;

test('GET api/users/:id returns correct user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/userid?id=69921e85d76868f0c06e335b`);
        assert.equal(response.status, 200, 'Status should be 200');

        const user = await response.json();
        assert.deepStrictEqual(user, {
            _id: "69921e85d76868f0c06e335b",
            name: "Ayhan electricité longwy",
            photos_profil: "",
            photos_background: "",
            password: "Snapface123*",
            email: "safinazylm_@gmail.com",
            phoneNo: 34256879,
            isOnline: false
        });

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/userid?id=69921e85d76868f0c06e335a`);
        assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

// assert for notFoundResponse not finish 
test('GET api/username/:name returns correct user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/username?name=Lilly`);
        assert.equal(response.status, 200, 'Status should be 200');

        const user = await response.json();
        assert.deepStrictEqual(user,[ {
            _id: '662eb2a1c2fd9ad3238d7528',
                photos_profil: 'https://res.cloudinary.com/dx99ggqy1/image/upload/v1744738721/uploads_secure/bsg0nrm7b5bainyunsea.jpg',
                photos_background: 'https://images.pexels.com/photos/20606208/pexels-photo-20606208/free-photo-of-city-buildings-behind-meadow-with-flowers.jpeg',
                email: 'lilly.robinson@icloud.com',
                phoneNo: 123,
                password: '$2a$10$AE.WbPAifRZQWynJtQ/iP.mDUmFIHcsHWaJRpb/2opnVLVC65tZ8K',
                isPrivate: false,
                isOnline: false,
                name: 'Lilly Robinson'
        }]);

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/username?name=lp`);
       // assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

// assert for notFoundResponse not finish 
test("GET /api/user return list of users", async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        // Make request to our API
        const response = await fetch(`http://localhost:${port}/api/user`);
        assert.equal(response.status, 200, 'Status should be 200');

        const user = await response.json();
        assert.deepStrictEqual(user[0],
            {
                _id: '662eb2a1c2fd9ad3238d7528',
                photos_profil: 'https://res.cloudinary.com/dx99ggqy1/image/upload/v1744738721/uploads_secure/bsg0nrm7b5bainyunsea.jpg',
                photos_background: 'https://images.pexels.com/photos/20606208/pexels-photo-20606208/free-photo-of-city-buildings-behind-meadow-with-flowers.jpeg',
                email: 'lilly.robinson@icloud.com',
                phoneNo: 123,
                password: '$2a$10$AE.WbPAifRZQWynJtQ/iP.mDUmFIHcsHWaJRpb/2opnVLVC65tZ8K',
                isPrivate: false,
                isOnline: false,
                name: 'Lilly Robinson'

            }, "first user ");

        // Test not found case
        const notFoundResponse = await fetch(`http://localhost:${port}/api/user`);
        // assert.equal(notFoundResponse.status, 404, 'Status should be 404');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})