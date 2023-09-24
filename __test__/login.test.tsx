import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/login/page";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Login Page", () => {
  it("Text yang seharusnya ada di halaman", () => {
    render(<Login />);

    // Assumptions about the presence of elements on the login page
    expect(screen.getByText("Dunia Bangunan")).toBeDefined();
    expect(screen.getByLabelText("Username")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByText("Masuk")).toBeDefined();
    expect(screen.getByText("Belum punya akun")).toBeDefined();
  });

  it("login berhasil", async () => {
    render(<Login />);

    const mockResponse = {
      status: 200,
      success: true,
      message: "Login Berhasil",
      data: {
        token: "",
        refreshToken: "",
        user: {
          id_user: 2,
          nama: "jhon doe",
          username: "jhon-doe",
          slug: "jhon-doe",
          whatsapp: "+628123456789",
          ip: "::ffff:172.18.0.14",
        },
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(usernameInput, { target: { value: "your-username" } });
    fireEvent.change(passwordInput, { target: { value: "your-password" } });

    fireEvent.submit(screen.getByRole("button", { name: "Masuk" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_HOST}/auth/user/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            username: "your-username",
            password: "your-password",
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      expect(screen.getByText("Login Berhasil")).toBeDefined();
    });
  });

  it("gagal login karena akun tidak ditemukan", async () => {
    render(<Login />);

    const mockReposponse = {
      status: 404,
      success: false,
      message: "Akun tidak ditemukan",
      error: {
        fields: {
          username: "Akun tidak ditemukan",
        },
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockReposponse),
    });

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(usernameInput, { target: { value: "your-username" } });
    fireEvent.change(passwordInput, { target: { value: "your-password" } });

    fireEvent.submit(screen.getByRole("button", { name: "Masuk" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_HOST}/auth/user/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            username: "your-username",
            password: "your-password",
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      expect(screen.getByText("Akun tidak ditemukan")).toBeDefined();
    });
  });
});
