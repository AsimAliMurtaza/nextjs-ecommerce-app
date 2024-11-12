const signIn = require('@next-auth/react');

test('login with username and password', async () => {
  const response = await signIn('asim@gmail.com', '123','true',
    '/');
  expect(response).toBe('success');
});