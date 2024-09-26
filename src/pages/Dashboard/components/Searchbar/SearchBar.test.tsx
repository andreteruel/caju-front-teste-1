import { render, fireEvent, screen } from "@testing-library/react";
import { SearchBar } from "./";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import '@testing-library/jest-dom';

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

const mockLoadRegistrations = jest.fn();
const mockSetSearchCpf = jest.fn();

beforeEach(() => {
  (useHistory as jest.Mock).mockReturnValue({ push: jest.fn() });
});

describe("SearchBar Component", () => {
  it("should render the text input and buttons", () => {
    render(<SearchBar loadRegistrations={mockLoadRegistrations} setSearchCpf={mockSetSearchCpf} />);

    expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Nova Admissão/i })).toBeInTheDocument();
  });

  it("should call loadRegistrations when the refresh button is clicked", () => {
    render(<SearchBar loadRegistrations={mockLoadRegistrations} setSearchCpf={mockSetSearchCpf} />);

    fireEvent.click(screen.getByLabelText("refetch"));
    expect(mockLoadRegistrations).toHaveBeenCalled();
  });

  it("should call setSearchCpf with formatted CPF if valid", () => {
    render(<SearchBar loadRegistrations={mockLoadRegistrations} setSearchCpf={mockSetSearchCpf} />);
    
    fireEvent.change(screen.getByPlaceholderText("Digite um CPF válido"), { target: { value: "12345678909" } });

    expect(mockSetSearchCpf).toHaveBeenCalledWith("123.456.789-09");
  });

  it("should redirect to the new admission page when the button is clicked", () => {
    const mockPush = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({ push: mockPush });

    render(<SearchBar loadRegistrations={mockLoadRegistrations} setSearchCpf={mockSetSearchCpf} />);

    fireEvent.click(screen.getByRole("button", { name: /Nova Admissão/i }));
    expect(mockPush).toHaveBeenCalledWith(routes.newUser);
  });
});
