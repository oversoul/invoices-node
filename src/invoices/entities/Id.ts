export default class Id {
  private _value: string;

  constructor(id: string) {
    if (id.length === 0) {
      throw new Error(IdError.error());
    }

    this._value = id;
  }

  get value(): string {
    return this._value;
  }
}

export class IdError {
  static error = (): string => "Id not provided.";
}
