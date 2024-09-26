import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewUserPage from "./";
import { createRegistration } from "~/services/registrations";
import useToast from "~/hooks/useToast";
import '@testing-library/jest-dom';

jest.mock("~/services/registrations");
jest.mock("~/hooks/useToast");
jest.mock("~/components/Loading", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));

const mockToast = {
  displayToast: jest.fn(),
};

beforeEach(() => {
  (useToast as jest.Mock).mockReturnValue(mockToast);
});

describe("NewUserPage Component", () => {
  it("should render input fields and button", async () => {
    render(
      <MemoryRouter>
        <NewUserPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("should display toast and navigate on successful registration", async () => {
    (createRegistration as jest.Mock).mockResolvedValue(true);
    
    render(
      <MemoryRouter>
        <NewUserPage />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("CPF"), {
      target: { value: "12345678909" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));
  });

  it("should display errors on invalid registration", async () => {
    (createRegistration as jest.Mock).mockResolvedValue(false);
    
    render(
      <MemoryRouter>
        <NewUserPage />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("CPF"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

  });
});
