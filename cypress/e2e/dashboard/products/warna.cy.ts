describe("CRUD warna", () => {
  it("crud", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('[for="username"]').type("superadmin");
    cy.get('[for="password"]').type("secret");

    cy.get("form").submit();

    cy.contains("Login Berhasil").should("exist");
    cy.visit("http://localhost:3000/dashboard/products/warna");
    // heading
    cy.get(".text-lg").should("exist");

    // pilihan limit
    cy.get(".ml-2").should("exist");

    // body table
    cy.get("tbody > tr > .px-6").should("exist");

    // tombol tambah
    cy.get("#Tambah").should("exist");

    // menambahkan data berhasil
    cy.get("#Tambah").click();
    cy.visit("http://localhost:3000/dashboard/products/warna/form");

    cy.get("#nama_warna").should("exist");
    cy.get("#nama_warna").type("test");
    cy.get("#Simpan").click();
    cy.contains("Berhasil menambahkan Data baru").should("exist");
    cy.visit("http://localhost:3000/dashboard/products/warna");


    cy.get("tbody > .cursor-pointer > :nth-child(2)").click();
    cy.visit("http://localhost:3000/dashboard/products/warna/test");

    cy.get("#editButton").click();
    cy.visit("http://localhost:3000/dashboard/products/warna/test/edit");

    cy.get("#nama_warna").should("exist");
    cy.get("#nama_warna").type("test edited");
    cy.get("#Simpan").click();
    cy.visit("http://localhost:3000/dashboard/products/warna/test");

    cy.get("#removeButton").click();
    cy.get("#NXConfirmButtonOk").click();

    cy.end();
  });
});
