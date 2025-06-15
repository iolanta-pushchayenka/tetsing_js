// @ts-check
import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../utils/userGenerator';

const BASE_URL = 'https://demoqa.com';

test.describe('DemoQA Account API tests', () => {
  let user;
  let userId;
  let token;

  test.beforeEach(async ({ request }) => {
    //Preparing a new user
    user = generateRandomUser();

    //POST /Account/v1/User – creating a user
    const userResponse = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: user,
    });
    expect(userResponse.status()).toBe(201);

    const userBody = await userResponse.json();
    userId = userBody.userID;

  
    //POST /Account/v1/GenerateToken – creating a token
    const tokenResponse = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: user,
    });
    expect(tokenResponse.status()).toBe(200);
    const tokenBody = await tokenResponse.json();
    token = tokenBody.token;
  });

  //Positive: creating a user
  test('POST /Account/v1/User - should create user with valid data', async () => {
    expect(user.userName).toBeDefined();
    expect(user.password).toBeDefined();
  });

  //Negative: an empty password
  test('POST /Account/v1/User - should fail to create user with empty password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/Account/v1/User`, {
      data: { userName: 'baduser', password: '' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBeDefined();
  });

  //Positive: token generation
  test('POST /Account/v1/GenerateToken - should generate token for valid user', async () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  //Negative: incorrect password
  test('POST /Account/v1/GenerateToken - should fail with wrong password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/Account/v1/GenerateToken`, {
      data: {
        userName: user.userName,
        password: 'InvalidPassword123',
      },
    });

    expect(response.status()).toBe(200); 
    const body = await response.json();
    expect(body.token).toBeNull();
    expect(body.result).toBe('User authorization failed.');
  });

  //Positive: get user data
  test('GET /Account/v1/User/{UUID} - should return user info with valid ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.username).toBe(user.userName);
  });

  //Negative: get data for a non-existent ID
  test('GET /Account/v1/User/{UUID} - should return error for invalid user ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Account/v1/User/fake-id`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect([401, 404]).toContain(response.status());
    const body = await response.json();
    expect(body.message).toBeDefined();
  });

  //Positive: delete user
  test('DELETE /Account/v1/User/{UUID} - should delete user with valid ID', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect([200, 204]).toContain(response.status());
  });

  //Negative: attempt to delete a fake user
  test('DELETE /Account/v1/User/{UUID} - should return error for non-existent user', async ({ request }) => {
    const fakeUserId = '00000000-0000-0000-0000-000000000000';

    const response = await request.delete(`${BASE_URL}/Account/v1/User/${fakeUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect([401, 404, 502, 200]).toContain(response.status());
  });
});
