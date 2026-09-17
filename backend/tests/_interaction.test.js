
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const { assertNotInReactiveContext } = require('@angular/core');
const app = express();
// Start the server
const server = http.createServer(app);
const port = 4100;
const interaction_object = {
    "userId": "69921e85d76868f0c06e335b", 
    "postId": "69921d7fd76868f0c06e3358",
    "interaction": 'like',
    interactionId :""
}

test('POST create interaction ', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        const responseCreateRequest = await fetch(`http://localhost:${port}/api/interaction/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(interaction_object)
        });
        assert.equal(responseCreateRequest.status, 200, 'Status should be 201');
        const interaction_ = await responseCreateRequest.json()
        interaction_object.interactionId = interaction_.interaction.insertedId

        
        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/interaction/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})



test('All interaction par user & type_i', async (t)=>{
        await new Promise(resolve => server.listen(0, resolve));
 try {
    const url= `http://localhost:${port}/api-interaction-by-userId`
          const response = await fetch(url+ 
            `?userId=${interaction_object.userId}&interactions=${interaction_object.interaction}` );
            assert.equal(response.status, 200, 'Status should be 200');
    
            const paramNull = await fetch(url + `?userId=&interactions=`);
            assert.equal(paramNull.status, 400, 'Status should be 400, param is null');
    

   } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})

test('NB interaction by post', async (t)=>{
        await new Promise(resolve => server.listen(0, resolve));
 try {
   const url= `http://localhost:${port}/api/interaction/count`
          const response = await fetch(url+ 
            `?postId=${interaction_object.postId}&interaction=${interaction_object.interaction}` );
            assert.equal(response.status, 200, 'Status should be 200');
    
            const paramNull = await fetch(url + `?userId=&interactions=`);
            assert.equal(paramNull.status, 400, 'Status should be 400, param is null');
    

   } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('interaction by post & type', async (t)=>{
        await new Promise(resolve => server.listen(0, resolve));
 try {
    const url= `http://localhost:${port}/api/interaction/by-postId-type`
          const response = await fetch(url+ 
            `?postId=${interaction_object.postId}&interaction=${interaction_object.interaction}` );
            assert.equal(response.status, 200, 'Status should be 200');
    
            const paramNull = await fetch(url + `?userId=&interactions=`);
            assert.equal(paramNull.status, 400, 'Status should be 400, param is null');
    

   } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})


test('interaction by post & type', async (t)=>{
        await new Promise(resolve => server.listen(0, resolve));
 try {
    const url= `http://localhost:${port}/api/interaction/exist`
          const response = await fetch(url+ 
            `?postId=${interaction_object.postId}&userId=${interaction_object.userId}` );
            assert.equal(response.status, 200, 'Status should be 200');
    
            const paramNull = await fetch(url + `?userId=&userId=`);
            assert.equal(paramNull.status, 400, 'Status should be 400, param is null');
    

   } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})




test('POST remove interaction ', async (t) => {
    await new Promise(resolve => server.listen(0, resolve));

    try {
        const responseCreateRequest = await fetch(`http://localhost:${port}/api/interaction/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(interaction_object)
        });
        assert.equal(responseCreateRequest.status, 201, 'Status should be 201');

        const responseCreateRequest_erreur = await fetch(`http://localhost:${port}/api/interaction/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
        });
        assert.equal(responseCreateRequest_erreur.status, 400, 'Status should be 400');


    } finally {
        // Clean up - close the server
        await new Promise(resolve => server.close(resolve));
    }
})