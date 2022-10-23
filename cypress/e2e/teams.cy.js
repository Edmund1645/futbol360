describe("Teams", () => {
  it("Can search for a team", () => {
    cy.intercept("/.netlify/**/team-list", { fixture: "team-list" }).as(
      "teamList"
    );
    cy.visit("/");
    cy.findByTestId("search-input").type("Manchester city");
    cy.findByTestId("search-results").should("exist");
  });

  it("Can view a team", () => {
    cy.intercept("/.netlify/**/team/65", {
      fixture: "mancity",
    }).as("fetchTeam");
    cy.intercept("/.netlify/**/standings", { fixture: "standings" }).as(
      "standings"
    );
    cy.findAllByTestId("search-result-65").click();
    cy.wait(["@fetchTeam", "@standings"]);
    cy.findByTestId("team-name").should("contain.text", "Manchester City FC");
    cy.findByTestId("season-stats").should("exist");
  });

  it("Can view other teams in the league", () => {
    cy.intercept("/.netlify/**/team/*", {
      fixture: "liverpool",
    }).as("fetchNewTeam");
    cy.findByTestId("other-teams-0").click();
    cy.wait("@fetchNewTeam");
    cy.findByTestId("team-name").should("contain.text", "Liverpool FC");
  });
});
