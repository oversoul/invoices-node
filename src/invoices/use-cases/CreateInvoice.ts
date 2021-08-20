import Id from "../entities/Id";
import Client from "../entities/Client";
import Invoice from "../entities/Invoice";
import LineItem from "../entities/LineItem";
import IdMaker from "../infrastructure/id_maker";
import InvoiceDataRepository from "../repositories/invoice-data-repository";

const CreateInvoice = (
  clientData: any,
  itemsData: any[],
  invoiceData: any,
  invoiceRepository: InvoiceDataRepository
) => {
  // create client
  const client = new Client(
    new Id(IdMaker()),
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
    new Id(IdMaker()),
    invoiceData.issuedOn,
    invoiceData.dueOn,
    invoiceData.description,
    invoiceData.recuring,
    items,
    client,
    invoiceData.notes
  );

  // save invoice
  if (!invoiceRepository.create(invoice)) {
    throw new Error("Invoice could not be created.");
  }
};

export default CreateInvoice;
