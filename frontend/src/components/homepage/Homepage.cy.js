import Homepage from "./Homepage";

describe("Homepage", () => {
  //#1
  it("sees all div", () => {
    cy.mount(<Homepage />);

    cy.get("div").should("be.visible");
  });

  //#2
  it("clicks logo", () => {
    cy.mount(<Homepage />);

    cy.get("a").eq(0).click();
  });

  //#3
  it("finds logo", () => {
    cy.mount(<Homepage />);

    cy.get("a").eq(0).find("img");
  });
});
