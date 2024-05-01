import formatCurrency from "../scripts/utils/money.js";

describe("Test suite : Format Currency", () => {
  it("convets cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to nearest decimal", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
