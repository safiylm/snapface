
// userService.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
app.use(express.json());
let id = "";
const newUser = {
    name: "Test User Potter",
    email: "test123@mail.com",
    password: "Test123+",
    phoneNo: 12345678
};


test('POST create user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseCreateRequest = await fetch(`http://localhost:${port}/api/user/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');

        const createdUser = await responseCreateRequest.json();
        id = createdUser.userId
        assert.equal(createdUser.message, "Inscription réussie");
        assert.ok(createdUser.userId, 'User should have an id');


        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/user/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "",
                email: "",
                password: "",
                phoneNo: 0
            })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('GET api/users/:id returns correct user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        let url = "http://localhost:4100/api/userid?id=" + id
        // Make request to our API
        const response = await fetch(url);
        assert.equal(response.status, 200, 'Status should be 200');

        const user = await response.json();
        assert.deepEqual(user._id, id)
        assert.equal(user.name, newUser.name)
        assert.equal(user.email, newUser.email)
        assert.equal(user.phoneNo, newUser.phoneNo)
        assert.equal(user.isOnline, false)
        assert.notEqual(user.password, newUser.password)


        const response_paramvide = await fetch("http://localhost:4100/api/userid?id=");
        assert.equal(response_paramvide.status, 400, 'Status should be 400');


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
        const response = await fetch(`http://localhost:${port}/api/username?name=Potter`);
        assert.equal(response.status, 200, 'Status should be 200');

        const user = await response.json();
        //   assert.deepEqual(user._id, id)
        assert.equal(user[0].email, newUser.email)
        assert.equal(user[0].phoneNo, newUser.phoneNo)
        assert.notEqual(user[0].password, newUser.password)

        const response_paramvide = await fetch(`http://localhost:${port}/api/username?name=`);
        assert.equal(response_paramvide.status, 400, 'Status should be 400');


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
        assert.notEqual(user[0]._id, null, "le 1er user id is not null")

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('POST edit user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseEditRequest = await fetch(`http://localhost:${port}/api/user/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": id, "name": "Harry Potter" })
        });
        assert.equal(responseEditRequest.status, 200, 'Status should be 200');

        const useredited = await responseEditRequest.json();
        assert.equal(useredited.message, "Modification réussie", "le nom a bien ete modifié")

        const responseEditRequest_erreur = await fetch(`http://localhost:${port}/api/user/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": "", "name": "" })
        });
        assert.equal(responseEditRequest_erreur.status, 400, 'Status should be 400');


    }
    finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }

});

test('POST delete user', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        const responseDeleteRequest = await fetch(`http://localhost:${port}/api/user/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": id })
        });

        assert.equal(responseDeleteRequest.status, 200, 'Status should be 200');


        const responseDeleteRequest_error = await fetch(`http://localhost:${port}/api/user/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": "" })
        });

        assert.equal(responseDeleteRequest_error.status, 400, 'Status should be 400');

    }
    finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }

});