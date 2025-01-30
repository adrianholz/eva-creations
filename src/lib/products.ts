import { faker } from '@faker-js/faker';

export function getProduct() {
  return faker.commerce.productDescription();
}

export function getPrice() {
  return faker.commerce.price();
}