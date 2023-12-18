import { ToastOptions, toast } from 'react-toastify';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// toasts
const toastSettings: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const toaster = {
  success: (message: string) => toast.success(message, toastSettings),
  info: (message: string) => toast.info(message, toastSettings),
  warning: (message: string) => toast.warning(message, toastSettings),
  error: (message: string) => toast.error(message, toastSettings),
};