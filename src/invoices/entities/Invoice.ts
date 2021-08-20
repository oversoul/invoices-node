import Id from "./Id";
import Client from "./Client";
import LineItem from "./LineItem";

export default class Invoice {
  private _id: Id;
  private _dueOn: Date;
  private _notes: string;
  private _issuedOn: Date;
  private _client: Client;
  private _items: LineItem[];
  private _recuring: boolean;
  private _description: string;

  constructor(
    id: Id,
    issuedOn: Date,
    dueOn: Date,
    description: string,
    recuring: boolean,
    items: LineItem[],
    client: Client,
    notes: string = ""
  ) {
    if (description.length === 0) {
      throw new Error(InvoiceError.description());
    }

    if (items.length === 0) {
      throw new Error(InvoiceError.items());
    }

    if (dueOn <= issuedOn) {
      throw new Error(InvoiceError.dueOn());
    }

    if (issuedOn < new Date(new Date().toDateString())) {
      throw new Error(InvoiceError.issuedOn());
    }

    this._id = id;
    this._dueOn = dueOn;
    this._items = items;
    this._notes = notes;
    this._client = client;
    this._recuring = recuring;
    this._issuedOn = issuedOn;
    this._description = description;
  }

  get id(): Id {
    return this._id;
  }

  get dueOn(): Date {
    return this._dueOn;
  }

  get issuedOn(): Date {
    return this._issuedOn;
  }

  get items(): LineItem[] {
    return this._items;
  }

  get notes(): string {
    return this._notes;
  }

  get recuring(): boolean {
    return this._recuring;
  }

  get description(): string {
    return this._description;
  }

  get client(): Client {
    return this._client;
  }
}

export class InvoiceError {
  static items = () => "Should at least have one line item.";
  static dueOn = () => "Due On date must be after issuing date.";
  static issuedOn = () => "Issued Date cannot be before today.";
  static description = () => "Description was not provided.";
}
