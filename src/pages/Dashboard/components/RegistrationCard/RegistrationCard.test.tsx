import { render, fireEvent, screen } from "@testing-library/react";
import RegistrationCard from "./";
import { Registration } from "~/services/registrations";
import '@testing-library/jest-dom';

const mockRegistration: Registration = {
  id: "1",
  employeeName: "John Doe",
  email: "john.doe@example.com",
  admissionDate: "2024-09-26",
  status: "REVIEW",
  cpf: "35928774028"
};

const mockOpenModal = jest.fn();
const mockOpenModalDelete = jest.fn();

describe("RegistrationCard Component", () => {
  it("should render registration data", () => {
    render(
      <RegistrationCard
        data={mockRegistration}
        openModal={mockOpenModal}
        openModalDelete={mockOpenModalDelete}
      />
    );

    expect(screen.getByRole("heading", { name: /John Doe/i })).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("2024-09-26")).toBeInTheDocument();
  });

  it("should call openModal with 'Reprovar' when Reprovar button is clicked", () => {
    render(
      <RegistrationCard
        data={mockRegistration}
        openModal={mockOpenModal}
        openModalDelete={mockOpenModalDelete}
      />
    );

    fireEvent.click(screen.getByText("Reprovar"));
    expect(mockOpenModal).toHaveBeenCalledWith(mockRegistration, 'Deseja reprovar o card?', 'REPROVED');
  });

  it("should call openModal with 'Aprovar' when Aprovar button is clicked", () => {
    render(
      <RegistrationCard
        data={{ ...mockRegistration, status: "REVIEW" }}
        openModal={mockOpenModal}
        openModalDelete={mockOpenModalDelete}
      />
    );

    fireEvent.click(screen.getByText("Aprovar"));
    expect(mockOpenModal).toHaveBeenCalledWith(mockRegistration, 'Deseja aprovar o card?', 'APROVED');
  });

  it("should call openModal with 'Revisar novamente' when Revisar novamente button is clicked", () => {
    render(
      <RegistrationCard
        data={{ ...mockRegistration, status: "APPROVED" }}
        openModal={mockOpenModal}
        openModalDelete={mockOpenModalDelete}
      />
    );

    fireEvent.click(screen.getByText("Revisar novamente"));
    expect(mockOpenModal).toHaveBeenCalledWith({ ...mockRegistration, status: "APPROVED" }, 'Deseja revisar novamente o card?', 'REVIEW');
  });
  
  it("should call openModalDelete with the correct ID when trash icon is clicked", () => {
    render(
        <RegistrationCard
          data={mockRegistration}
          openModal={mockOpenModal}
          openModalDelete={mockOpenModalDelete}
        />
      );
    
      const trashIcon = screen.getByTestId("trash-icon"); 
      fireEvent.click(trashIcon);
      expect(mockOpenModalDelete).toHaveBeenCalledWith(mockRegistration.id);
  });
  
});
