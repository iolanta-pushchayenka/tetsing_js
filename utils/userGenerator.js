// utils/userGenerator.js

export function generateRandomUser() {
    return {
      userName: 'user' + Math.floor(Math.random() * 100000),
      password: 'Password123!',
    };
  }
  