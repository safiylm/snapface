
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
const message_object = {
    _id: "",
    sender: "662eb2a1c2fd9ad3238d7528",
    conversationId: "",
    text: "test unit message",
    postId: "",
    seen: false,
    isEdited: false,
    isDeleted: false,
}
const conversation_object = {
    _id: "",
    speaker: ["662eb2a1c2fd9ad3238d7528",
        "662eb361c2fd9ad3238d752a"
    ],
}

const param_object = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
}


test('POST create conversation with first message ', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        const url = `http://localhost:${port}/conversation/create`

        const responseCreateRequest_erreur = await fetch(url, param_object)
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


        param_object.body = JSON.stringify({
            "receiver": conversation_object.speaker[0],
            "sender": conversation_object.speaker[1],
            "text": "Hello, i am a test"
        })

        const responseCreateRequest = await fetch(url, param_object);

        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');
        const reponse = await responseCreateRequest.json();
        conversation_object._id = reponse.conversation.insertedId
        message_object.conversationId = reponse.conversation.insertedId
        message_object._id = reponse.message.insertedId


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('POST create & delete message', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    try {
        const url = `http://localhost:${port}/message/create`

        param_object.body = JSON.stringify(message_object)
        const responseCreateRequest = await fetch(url, param_object);
        const reponse = await responseCreateRequest.json();
        const id = reponse.insertedId
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');

        param_object.body = JSON.stringify({ "id": id })
        const responseDeleteMessageRequest = await fetch(
            `http://localhost:${port}/message/delete`, param_object);
        assert.equal(responseDeleteMessageRequest.status, 200, 'Status should be 201');

        param_object.body = JSON.stringify({})

        const responseCreateRequest_erreur = await fetch(url, param_object);
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})





test('POST edit message', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        const url = `http://localhost:${port}/message/edit`
        param_object.body = JSON.stringify({ "conversationId": conversation_object._id, 
            "id": message_object._id, "text": 'message modifieeee'
         })

        const responseCreateRequest = await fetch(url, param_object)
        assert.equal(responseCreateRequest.status, 200, 'Status should be 201');

        param_object.body = JSON.stringify({})
        const responseCreateRequest_erreur = await fetch(url, param_object);
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('POST mark as seen message', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {

        param_object.body = JSON.stringify({
            "conversationId": conversation_object._id,
            "userId": message_object.sender
        })

        const url = `http://localhost:${port}/message/markasseen`
        const responseCreateRequest = await fetch(url, param_object);
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');

        param_object.body = JSON.stringify({})
        const responseCreateRequest_erreur = await fetch(url, param_object);
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('All conversations by userid', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    try {
        const url = `http://localhost:${port}/conversations`
        const response = await fetch(url +
            `?userId=${message_object.sender}`);
        assert.equal(response.status, 200, 'Status should be 200');

        const paramNull = await fetch(url + `?userId=`);
        assert.equal(paramNull.status, 400, 'Status should be 400, param is null');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('Conversation by id', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    try {
        const url = `http://localhost:${port}/messages`
        const response = await fetch(url +
            `?conversationId=${conversation_object._id}`);
        assert.equal(response.status, 200, 'Status should be 200');

        const paramNull = await fetch(url + `?conversationId=`);
        assert.equal(paramNull.status, 400, 'Status should be 400, param is null');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('Conversation by id', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));
    try {
        const url = `http://localhost:${port}/conversation`
        const response = await fetch(url +
            `?id=${conversation_object._id}`);
        assert.equal(response.status, 200, 'Status should be 200');

        const paramNull = await fetch(url + `?id=`);
        assert.equal(paramNull.status, 400, 'Status should be 400, param is null');

    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})




test('POST delete conversation', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        param_object.body = JSON.stringify({ "conversationId": conversation_object._id })
        const responseCreateRequest = await fetch(
            `http://localhost:${port}/conversation/delete`, param_object);
        assert.equal(responseCreateRequest.status, 200, 'Status should be 201');

        param_object.body = JSON.stringify({})
        const responseCreateRequest_erreur = await fetch(
            `http://localhost:${port}/conversation/delete`,
            param_object
        );
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');
    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})





