import { toast } from 'react-toastify';

const useToast = () => {
  const displayToast = (
    message: string,
    type: 'error' | 'success' | 'warning' | 'info'
  ) => {
    switch (type) {
      case 'success':
        return toast.success(message);
      case 'warning':
        return toast.warning(message);
      case 'error':
        return toast.error(message);
      default:
        return toast.info(message);
    }
  };

  return {
    displayToast,
  };
};

export default useToast;
