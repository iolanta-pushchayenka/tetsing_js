// tests/user-api-mock.spec.js
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.example.com';

const validUserResponse = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  phone: '+1-555-123-4567',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    country: 'USA',
  },
  company: {
    name: 'Doe Enterprises',
    industry: 'Technology',
    position: 'Software Engineer',
  },
  dob: '1990-05-15',
  profile_picture_url: 'https://example.com/images/johndoe.jpg',
  is_active: true,
  created_at: '2023-01-01T12:00:00Z',
  updated_at: '2023-10-01T12:00:00Z',
  preferences: {
    language: 'en',
    timezone: 'America/New_York',
    notifications_enabled: true,
  }
};

const errorResponses = {
  403: { error: 'Forbidden', details: 'You do not have access.' },
  404: { error: 'Not Found', details: 'User not found.' },
  502: { error: 'Bad Gateway', details: 'Server error.' },
};

test('GET /users/1 - returns valid user structure', async ({ page }) => {
  await page.route(`${BASE_URL}/users/1`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(validUserResponse),
    });
  });

  const body = await page.evaluate(async () => {
    const response = await fetch('https://api.example.com/users/1');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  });

  expect(body).toMatchObject({
    id: expect.any(Number),
    name: expect.any(String),
    email: expect.stringMatching(/@/),
    address: expect.any(Object),
    company: expect.any(Object),
    preferences: expect.any(Object),
    is_active: expect.any(Boolean),
  });

  expect(body.address).toEqual(
    expect.objectContaining({
      street: expect.any(String),
      city: expect.any(String),
      country: expect.any(String),
    })
  );
});

for (const [status, errorBody] of Object.entries(errorResponses)) {
  test(`GET /users/999 returns ${status} with valid error structure`, async ({ page }) => {
    await page.route(`${BASE_URL}/users/999`, route => {
      route.fulfill({
        status: Number(status),
        contentType: 'application/json',
        body: JSON.stringify(errorBody),
      });
    });

    const responseData = await page.evaluate(async () => {
      const res = await fetch('https://api.example.com/users/999');
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(responseData.status).toBe(Number(status));
    expect(responseData.body).toMatchObject({
      error: expect.any(String),
      details: expect.any(String),
    });
  });
}

async function getUser(id, page) {
  const res = await page.evaluate(async (userId) => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details);
    }
    return response.json();
  }, id);

  return res;
}

test('getUser throws on 404', async ({ page }) => {
  await page.route(`${BASE_URL}/users/999`, route => {
    route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify(errorResponses[404]),
    });

  });

  await expect(getUser(999, page)).rejects.toThrow('User not found.');

});

test('DELETE /users/1 returns 204 No Content', async ({ page }) => {
  await page.route(`${BASE_URL}/users/1`, route => {
    route.fulfill({
      status: 204,
      body: '', 
    });
  });

  const status = await page.evaluate(async () => {
    const response = await fetch('https://api.example.com/users/1', {
      method: 'DELETE',
    });
    return response.status;
  });

  expect(status).toBe(204);
});