import { renderHook } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';
import useToast from './useToast';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

describe('useToast Hook', () => {
  it('should call toast.success when type is success', () => {
    const { result } = renderHook(() => useToast());
    result.current.displayToast('Success message', 'success');
    expect(toast.success).toHaveBeenCalledWith('Success message');
  });

  it('should call toast.warning when type is warning', () => {
    const { result } = renderHook(() => useToast());
    result.current.displayToast('Warning message', 'warning');
    expect(toast.warning).toHaveBeenCalledWith('Warning message');
  });

  it('should call toast.error when type is error', () => {
    const { result } = renderHook(() => useToast());
    result.current.displayToast('Error message', 'error');
    expect(toast.error).toHaveBeenCalledWith('Error message');
  });

  it('should call toast.info when type is info', () => {
    const { result } = renderHook(() => useToast());
    result.current.displayToast('Info message', 'info');
    expect(toast.info).toHaveBeenCalledWith('Info message');
  });

  it('should call toast.info by default for unknown type', () => {
    const { result } = renderHook(() => useToast());
    result.current.displayToast('Default message', 'unknown' as any);
    expect(toast.info).toHaveBeenCalledWith('Default message');
  });
});
