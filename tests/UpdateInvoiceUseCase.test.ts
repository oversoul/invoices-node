import InvoiceDataRepository from "../src/invoices/repositories/invoice-data-repository";
import UpdateInvoice from "../src/invoices/use-cases/UpdateInvoice";

const after5 = new Date();
after5.setDate(after5.getDate() + 5);
const client = { id: "some-id", name: "name", email: "email@email.com" };
const items = [{ name: "item-name", price: 1, quantity: 1 }];
const invoice = {
  id: "inv-id",
  dueOn: after5,
  recuring: false,
  issuedOn: new Date(),
  description: "description",
};

it("Should throw and error when invoice cannot be updated.", () => {
  const InvoiceRepo = new InvoiceDataRepository();
  jest.spyOn(InvoiceRepo, "update").mockImplementation(() => {
    return false;
  });

  expect(() => {
    UpdateInvoice(client, items, invoice, InvoiceRepo);
  }).toThrowError();
});

it("Should be possible to update an invoice.", () => {
  const InvoiceRepo = new InvoiceDataRepository();
  jest.spyOn(InvoiceRepo, "update").mockImplementation((data: any) => {
    expect(data.id.value).toEqual(invoice.id);
    expect(data.dueOn).toEqual(after5);
    expect(data.client.name).toEqual(client.name);
    expect(data.client.email).toEqual(client.email);
    expect(data.client.id.value).toEqual(client.id);
    return true;
  });

  expect(() => {
    UpdateInvoice(client, items, invoice, InvoiceRepo);
  }).not.toThrowError();
});
