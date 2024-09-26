import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashboardPage from "./";
import { getRegistrations } from "~/services/registrations";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("~/services/registrations");
jest.mock("~/components/Loading", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));

const mockRegistrations = [
  {
    id: "1",
    employeeName: "John Doe",
    email: "john.doe@example.com",
    admissionDate: "2024-09-26",
    status: "REVIEW",
  cpf: "35928774028"
  },
];

describe("DashboardPage Component", () => {
    beforeEach(() => {
      (getRegistrations as jest.Mock).mockResolvedValue(mockRegistrations);
    });
  
    it("should render loading spinner while loading", () => {
      render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      );
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  
    it("should render SearchBar and Columns components", async () => {
      render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      );
      await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
      expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
      expect(screen.getByText("Aprovar")).toBeInTheDocument();
    });
  
    it("should load registrations when searchCpf changes", async () => {
      render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      );
      await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
      
      fireEvent.change(screen.getByPlaceholderText("Digite um CPF válido"), {
        target: { value: "12345678909" },
      });
      
      await waitFor(() => expect(getRegistrations).toHaveBeenCalledWith("123.456.789-09"));
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });