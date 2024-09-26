// ModalConfirm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalConfirm } from './';
import '@testing-library/jest-dom'; 

jest.mock('./styled', () => ({
  ContainerModal: ({ children }: { children: React.ReactNode }) => <div data-testid="container-modal">{children}</div>,
  Modal: ({ children }: { children: React.ReactNode }) => <div data-testid="modal">{children}</div>,
  CloseBox: ({ children }: { children: React.ReactNode }) => <div data-testid="close-box">{children}</div>,
  ContainerText: ({ children }: { children: React.ReactNode }) => <div data-testid="container-text">{children}</div>,
  ContainerButtons: ({ children }: { children: React.ReactNode }) => <div data-testid="container-buttons">{children}</div>,
}));

jest.mock("react-icons/hi", () => ({
  HiOutlineX: ({ onClick }: { onClick: () => void }) => <div data-testid="close-icon" onClick={onClick}></div>,
}));

jest.mock('../Buttons', () => ({
  ButtonModal: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button data-testid="button-modal" onClick={onClick}>{children}</button>
  ),
}));

describe('ModalConfirm Component', () => {
  const mockCloseModal = jest.fn();
  const mockConfirmModal = jest.fn();
  const mensagem = "Você tem certeza?";

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should render the ModalConfirm with the correct message', () => {
    render(<ModalConfirm mensagem={mensagem} closeModal={mockCloseModal} confirmModal={mockConfirmModal} />);

    const containerModal = screen.getByTestId('container-modal');
    const modalText = screen.getByTestId('container-text');
    expect(containerModal).toBeInTheDocument();
    expect(modalText).toHaveTextContent(mensagem);
  });

  it('should call closeModal when the close icon (X) is clicked', () => {
    render(<ModalConfirm mensagem={mensagem} closeModal={mockCloseModal} confirmModal={mockConfirmModal} />);

    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should call closeModal when the Cancelar button is clicked', () => {
    render(<ModalConfirm mensagem={mensagem} closeModal={mockCloseModal} confirmModal={mockConfirmModal} />);

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should call confirmModal when the Confirmar button is clicked', () => {
    render(<ModalConfirm mensagem={mensagem} closeModal={mockCloseModal} confirmModal={mockConfirmModal} />);

    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);

    expect(mockConfirmModal).toHaveBeenCalledTimes(1);
  });
});
