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
    cy.get(".error")
      .should("contain", "invalid username or password")
      .should("have.css", "background-color", "rgb(255, 0, 0)")
      .should("have.css", "font-size", "30px");

    cy.get("html").should("not.contain", "Create a new note");
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
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#inputNote").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("it can be made not important", function () {
        // cy.contains("second note").parent().contains("change false").click();
        // cy.contains("second note").parent().contains("change true");
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "change true");
      });
    });
  });
});
