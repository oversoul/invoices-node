import InvoiceDataRepository from "../src/invoices/repositories/invoice-data-repository";
import CreateInvoice from "../src/invoices/use-cases/CreateInvoice";

const after5 = new Date();
after5.setDate(after5.getDate() + 5);
const client = { id: "some-id", name: "name", email: "email@email.com" };
const items = [{ name: "item-name", price: 1, quantity: 1 }];
const invoice = {
  dueOn: after5,
  issuedOn: new Date(),
  recuring: false,
  description: "description",
};

it("Should throw and error when invoice cannot be created.", () => {
  const InvoiceRepo = new InvoiceDataRepository();
  jest.spyOn(InvoiceRepo, "create").mockImplementation(() => {
    return false;
  });

  expect(() => {
    CreateInvoice(client, items, invoice, InvoiceRepo);
  }).toThrowError();
});

it("Should be possible to create an invoice.", () => {
  const InvoiceRepo = new InvoiceDataRepository();
  jest.spyOn(InvoiceRepo, "create").mockImplementation((data: any) => {
    expect(data.dueOn).toEqual(after5);
    expect(data.client.name).toEqual(client.name);
    return true;
  });

  expect(() => {
    CreateInvoice(client, items, invoice, InvoiceRepo);
  }).not.toThrowError();
});
