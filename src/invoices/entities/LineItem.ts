export default class LineItem {
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(name: string, quantity: number, price: number) {
    if (name.length === 0) {
      throw new Error(LineItemError.itemName());
    }

    if (isNaN(quantity) || quantity <= 0) {
      throw new Error(LineItemError.quantity());
    }

    if (isNaN(price) || price <= 0) {
      throw new Error(LineItemError.price());
    }

    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get total(): number {
    return this._quantity * this._price;
  }
}

export class LineItemError {
  static itemName = () => "Name was not provided.";
  static price = () => "Line item price not provided.";
  static quantity = () => "Line item quantity not provided.";
}
