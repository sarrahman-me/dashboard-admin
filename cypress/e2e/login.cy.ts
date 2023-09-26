describe("Pengujian Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("tampilan wajib dari halaman ini", () => {
    cy.contains("Dunia Bangunan").should("exist");
    cy.get('[for="username"]').should("exist");
    cy.get('[for="password"]').should("exist");
    cy.contains("Masuk").should("exist");
    cy.contains("Belum punya akun").should("exist");
  });

  it("Login harus gagal", () => {
    // Mengisi formulir login dengan informasi yang salah
    cy.get('[for="username"]').type("invalid-username");
    cy.get('[for="password"]').type("invalid-password");

    // Menyimulasikan pengiriman formulir
    cy.get("form").submit();

    // Memeriksa pesan akun tidak ditemukan
    cy.contains("Akun tidak ditemukan").should("exist");
  });

  it("login harus berhasil", () => {
    // Mengisi formulir login
    cy.get('[for="username"]').type("superadmin");
    cy.get('[for="password"]').type("secret");

    // Menyimulasikan pengiriman formulir
    cy.get("form").submit();

    // Memeriksa pesan login berhasil
    cy.contains("Login Berhasil").should("exist");
  });
});
