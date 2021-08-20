import Id, { IdError } from "../../src/invoices/entities/Id";

it("Should throw an error when id is not provided", () => {
  expect(() => {
    new Id('')
  }).toThrow(IdError.error());
});

it("Should not throw any errors.", () => {
  expect(() => {
    new Id('some-id');
  }).not.toThrowError();
});

it("Should be able to get the value.", () => {
  const idValue = 'some-id-value';
  const id = new Id(idValue);
  expect(id.value).toEqual(idValue);
});
