import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './';
import '@testing-library/jest-dom';

jest.mock('./styled', () => ({
  ContainerLoader: ({ children }: { children: React.ReactNode }) => <div data-testid="container-loader">{children}</div>,
  Loader: () => <div data-testid="loader" />
}));

describe('LoadingSpinner Component', () => {
  it('should render the LoadingSpinner component', () => {
    render(<LoadingSpinner />);

    const containerLoader = screen.getByTestId('container-loader');
    expect(containerLoader).toBeInTheDocument();

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
