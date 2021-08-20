import Id from "../../src/invoices/entities/Id";
import Client from "../../src/invoices/entities/Client";
import Invoice, { InvoiceError } from "../../src/invoices/entities/Invoice";
import LineItem from "../../src/invoices/entities/LineItem";

const id = new Id("inv-1");
const client = new Client(new Id("client-id"), "name", "email@email.com");
const items = [new LineItem("name", 20, 10)];
const today = new Date();
const afterFiveDays = new Date();
afterFiveDays.setDate(today.getDate() + 5);
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

it("Should throw an error when description is not provided", () => {
  expect(() => {
    new Invoice(id, today, afterFiveDays, "", false, items, client, "");
  }).toThrow(InvoiceError.description());
});

it("Should throw an error when issuedOn is after or same as DueOn", () => {
  expect(() => {
    new Invoice(id, today, today, "description", false, items, client);
  }).toThrow(InvoiceError.dueOn());
});

it("Should throw an error when issuedOn is before today", () => {
  expect(() => {
    new Invoice(id, yesterday, today, "description", false, items, client);
  }).toThrow(InvoiceError.issuedOn());
});

it("Should throw an error when items not provided", () => {
  expect(() => {
    new Invoice(id, today, afterFiveDays, "description", false, [], client, "");
  }).toThrow(InvoiceError.items());
});

it("Should not throw any errors.", () => {
  expect(() => {
    new Invoice(id, today, afterFiveDays, "description", false, items, client);
  }).not.toThrowError();
});

it("Should have getters", () => {
  const invoice = new Invoice(
    id,
    today,
    afterFiveDays,
    "description",
    false,
    items,
    client
  );

  expect(invoice.notes).toEqual("");
  expect(invoice.issuedOn).toEqual(today);
  expect(invoice.recuring).toEqual(false);
  expect(invoice.description).toEqual("description");
  expect(invoice.items.length).toEqual(items.length);
});
