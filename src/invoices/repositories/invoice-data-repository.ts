import Invoice from "../entities/Invoice";

export default class InvoiceDataRepository {
  create(_invoiceData: Invoice): boolean {
    // do some database stuff.
    //
    return true;
  }

  update(_invoiceData: Invoice): boolean {
    // _invoiceData.id.value; this is the id...
    return true;
  }

  delete(_id: string): boolean {
    return true;
  }
}
