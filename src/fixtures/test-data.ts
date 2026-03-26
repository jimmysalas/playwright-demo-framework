import { faker } from '@faker-js/faker';
import type { CheckoutInfo } from '../types';

export const generateCheckoutInfo = (): CheckoutInfo => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode('#####'),
});
