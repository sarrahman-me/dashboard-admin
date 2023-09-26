describe("Pengujian Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("tampilan wajib dari halaman ini", () => {
    cy.contains("Sarrahman Bangunan").should("exist");
    cy.get('[for="nama"]').should("exist");
    cy.get('[for="username"]').should("exist");
    cy.get('[for="email"]').should("exist");
    cy.get('[for="whatsapp"]').should("exist");
    cy.get('[for="password"]').should("exist");
    cy.contains("Daftar").should("exist");
    cy.contains("Sudah punya akun").should("exist");
  });

//   it("login harus berhasil", () => {
//     // Mengisi formulir login dengan informasi yang salah
//     cy.get('[for="nama"]').type("superadmin");
//     cy.get('[for="username"]').type("superadmin");
//     cy.get('[for="email"]').type("superadmin@gmail.com");
//     cy.get('[for="whatsapp"]').type("08123456789");
//     cy.get('[for="password"]').type("secret");

//     // Menyimulasikan pengiriman formulir
//     cy.get("form").submit();

//     // Memeriksa pesan akun tidak ditemukan
//     cy.contains("Pendaftaran user berhasil").should("exist");
//   });

  it("Register harus gagal (username sudah digunakan)", () => {
    // Mengisi formulir login dengan informasi yang salah
    cy.get('[for="nama"]').type("superadmin");
    cy.get('[for="username"]').type("superadmin");
    cy.get('[for="email"]').type("superadmin@gmail.com");
    cy.get('[for="whatsapp"]').type("08123456789");
    cy.get('[for="password"]').type("secret");

    // Menyimulasikan pengiriman formulir
    cy.get("form").submit();

    // Memeriksa pesan akun tidak ditemukan
    cy.contains("Username sudah digunakan").should("exist");
  });
});
