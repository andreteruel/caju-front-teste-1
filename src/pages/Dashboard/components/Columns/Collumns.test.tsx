import { render, fireEvent, screen } from "@testing-library/react";
import Collumns from "./";
import { Registration } from "~/services/registrations";
import '@testing-library/jest-dom';

jest.mock("~/hooks/useToast");

const mockLoadRegistrations = jest.fn();
const mockSetLoading = jest.fn();

const mockRegistrations: Registration[] = [
  {
    id: "1",
    employeeName: "John Doe",
    email: "john.doe@example.com",
    admissionDate: "2024-09-26",
    status: "REVIEW",
    cpf: "35928774028"
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    email: "jane.smith@example.com",
    admissionDate: "2024-09-26",
    status: "APPROVED",
    cpf: "35928774028"
  },
];

describe("Collumns Component", () => {
  it("should render correctly with registrations", () => {
    render(
      <Collumns
        registrations={mockRegistrations}
        loadRegistrations={mockLoadRegistrations}
        setLoading={mockSetLoading}
      />
    );

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should open modal for status change", () => {
    render(
      <Collumns
        registrations={mockRegistrations}
        loadRegistrations={mockLoadRegistrations}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.click(screen.getByText("Reprovar"));
    expect(screen.getByText("Deseja reprovar o card?")).toBeInTheDocument();
  });

});
