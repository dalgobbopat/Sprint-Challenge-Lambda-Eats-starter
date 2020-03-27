describe("Testing our pizza form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/order");
    });
    it('Adds inputs and submit', function(){
        cy.get('input[name="name"]')
        .type("Patrick")
        .should("have.value", "Patrick");
        cy.get('input[name="special"]')
        .type("None")
        .should("have.value", "None");
        cy.get("#size")
        .select("large")
        .should("have.value", "large");
        cy.get('[type="checkbox"]').check();
        cy.get("button").click();
    });
});