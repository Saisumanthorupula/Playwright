// API testing in Playwright means testing backend APIs directly by 
// sending HTTP requests and validating responses, without opening 
// a browser or interacting with the UI.

//*******************************************GET***********************************************

import { test, expect, request } from '@playwright/test'

// The below test will print the user whose id is 1 from server

test('Get user whose id is 1', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
      // Validate status code
    expect(response.status()).toBe(200);
    console.log(response.status());      // 200
    console.log(response.statusText());  // OK
    console.log(response.ok());          // true for any 2xx

     // Validate response body
    const body = await response.json();

    console.log(body);
    expect(body.id).toBe(1);
    console.log(body.id);

    expect(body.email).toContain('@');
    console.log(body.email);

});



test('Get all users', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/users');

    expect(response.status()).toBe(200);
    console.log(response.status());      // 200
    console.log(response.statusText());  // OK

    const body = await response.json();
    console.log(body);

});

//*****************************************POST***********************************************
test('Post', async({request})=>{
  
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    });

    expect(response.status()).toBe(201);   // 201 = Created
    console.log(response.status());

    const body = await response.json();
    console.log(body);

    expect(body.title).toBe('foo');
    expect(body.userId).toBe(1);
    expect(body.id).toBeDefined();

});

//*****************************************PUT***************************************************
test('Put', async ({ request }) => {

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            id: 1,
            title: 'updated title',
            body: 'updated body',
            userId: 1
        }
    });

    expect(response.status()).toBe(200);   // PUT returns 200 (updated)
    console.log(response.status());

    const body = await response.json();
    console.log(body);

    expect(body.id).toBe(1);
    expect(body.title).toBe('updated title');
    expect(body.body).toBe('updated body');

});

//******************************************PATCH***************************************************
test('PATCH update a title', async ({ request }) => {
  const response = await request.patch(
    'https://jsonplaceholder.typicode.com/posts/1',
    {
      data: {
        title: 'New title'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.title).toBe('New title');
});

//*******************************************DELETE***************************************************

test('DELETE a post', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);
});

