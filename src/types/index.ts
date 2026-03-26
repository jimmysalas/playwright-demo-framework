export interface UserCredentials {
  username: string;
  password: string;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface CartItem {
  name: string;
  price: string;
}

export const USERS: Record<string, UserCredentials> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'wrong_password' },
};
