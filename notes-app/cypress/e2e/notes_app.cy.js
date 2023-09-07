describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    cy.visit("http://localhost:5173");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#loginButton").click();

    // cy.get(".error").contains("invalid username or password");
    cy.get(".error").should("contain", "invalid username or password");
    cy.get(".error").should("have.css", "background-color", "rgb(255, 0, 0)");
    cy.get(".error").should("have.css", "border-style", "solid");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("this is fake note");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#loginButton").click();
    cy.contains("Create a new note");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#inputNote").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("#inputNote").type("another note cypress");
        cy.contains("save").click();
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress").contains("change true").click();

        cy.contains("another note cypress").contains("change false");
      });
    });
  });
});
