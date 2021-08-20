import Id from "../../src/invoices/entities/Id";
import Client, { ClientError } from "../../src/invoices/entities/Client";

const id = new Id('some-id');

it("Should throw an error when client name is not provided", () => {
  expect(() => {
    new Client(id, '', 'email@email.com')
  }).toThrow(ClientError.clientName());
});

it("Should throw an error when client email is not provided", () => {
  expect(() => {
    new Client(id, 'name', '')
  }).toThrow(ClientError.clientEmail());
});

it("Should throw an error when client email is not valid", () => {
  expect(() => {
    new Client(id, 'name', 'not-an-email')
  }).toThrow(ClientError.clientEmail());
});

it("Should not throw any errors.", () => {
  expect(() => {
    new Client(id, 'name', 'email@email.com')
  }).not.toThrowError();
});

