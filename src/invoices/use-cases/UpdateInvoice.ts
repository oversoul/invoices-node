import Id from "../entities/Id";
import Client from "../entities/Client";
import Invoice from "../entities/Invoice";
import LineItem from "../entities/LineItem";
import InvoiceDataRepository from "../repositories/invoice-data-repository";

const UpdateInvoice = (
  clientData: any,
  itemsData: any[],
  invoiceData: any,
  invoiceRepo: InvoiceDataRepository
) => {
  // create client
  const client = new Client(
    new Id(clientData.id),
    clientData.name,
    clientData.email
  );

  // create line items
  const items: LineItem[] = [];
  for (let item of itemsData) {
    items.push(new LineItem(item.name, item.quantity, item.price));
  }

  // create invoice
  const invoice = new Invoice(
    new Id(invoiceData.id),
    invoiceData.issuedOn,
    invoiceData.dueOn,
    invoiceData.description,
    invoiceData.recuring,
    items,
    client,
    invoiceData.notes
  );

  // save invoice
  if (!invoiceRepo.update(invoice)) {
    throw new Error("Invoice could not be created.");
  }
};

export default UpdateInvoice;
