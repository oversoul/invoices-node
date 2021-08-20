import LineItem, { LineItemError } from "../../src/invoices/entities/LineItem";

it("Should throw an error when item not is not provided", () => {
  expect(() => {
    new LineItem("", 5, 5);
  }).toThrow(LineItemError.itemName());
});

it("Should throw an error when quantity is less or equal to zero", () => {
  expect(() => {
    new LineItem("item-name", -5, 5);
  }).toThrow(LineItemError.quantity());
});

it("Should throw an error when price is less or equal to zero", () => {
  expect(() => {
    new LineItem("item-name", 5, -5);
  }).toThrow(LineItemError.price());
});

it("Should not throw any errors.", () => {
  expect(() => {
    new LineItem("some-item", 10, 20);
  }).not.toThrowError();
});

it("Should be able to calculate total.", () => {
  const price = Math.floor(Math.random() * 100) + 1;
  const quantity = Math.floor(Math.random() * 100) + 1;

  const item = new LineItem("some-item", quantity, price);
  expect(item.total).toStrictEqual(price * quantity);
});

it("Should have getters", () => {
    const item = new LineItem("some-item", 10, 20);
    expect(item.name).toEqual("some-item");
    expect(item.price).toEqual(20);
    expect(item.quantity).toEqual(10);
});
