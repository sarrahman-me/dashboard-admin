import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "@/app/register/page";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Register page", () => {
  it("text yang seharusnya ada di halaman", () => {
    render(<Register />);

    const labelForm = ["Nama", "Username", "Email", "Whatsapp", "Password"];

    expect(screen.getByText("Sarrahman Bangunan")).toBeDefined();
    expect(screen.getByText("Daftar")).toBeDefined();
    expect(screen.getByText("Sudah punya akun")).toBeDefined();

    for (const label of labelForm) {
      expect(screen.getByLabelText(label)).toBeDefined();
    }
  });

  it("Register berhasil", async () => {
    render(<Register />);

    const mockResponse = {
      status: 200,
      success: true,
      message: "Pendaftaran user berhasil",
      data: {},
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const nameInput = screen.getByLabelText("Nama");
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const whatsappInput = screen.getByLabelText("Whatsapp");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(nameInput, { target: { value: "superadmin" } });
    fireEvent.change(usernameInput, { target: { value: "superadmin" } });
    fireEvent.change(emailInput, { target: { value: "superadmin@gmail.com" } });
    fireEvent.change(whatsappInput, { target: { value: "08123456789" } });
    fireEvent.change(passwordInput, { target: { value: "secret" } });

    fireEvent.submit(screen.getByRole("button", { name: "Daftar" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_HOST}/auth/user/register`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            nama: "superadmin",
            username: "superadmin",
            email: "superadmin@gmail.com",
            whatsapp: "08123456789",
            password: "secret",
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      expect(screen.getByText("Pendaftaran user berhasil")).toBeDefined();
    });
  });
});
