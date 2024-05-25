import type { SignUpBody, SignInBody } from '../../types/auth';

export const testSignInData: SignInBody = {
  email: 'johndoes@gmail.com',
  password: 'password123',
};

export const testSignUpData: SignUpBody = {
  ...testSignInData,
  name: 'John Does',
};
