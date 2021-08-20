import Id from "./Id";

export default class Client {
  private _id: Id;
  private _name: string;
  private _email: string;

  constructor(id: Id, name: string, email: string) {
    if (name.length === 0) {
      throw new Error(ClientError.clientName());
    }

    if (email.length === 0 || !this.validateEmail(email)) {
      throw new Error(ClientError.clientEmail());
    }

    this._id = id;
    this._name = name;
    this._email = email;
  }

  private validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}

export class ClientError {
  static clientName = () => "Name should not be empty.";
  static clientEmail = () => "Email is not a valid email address.";
}
