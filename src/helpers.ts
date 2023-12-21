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

export function stripTime(dateString: string) {
  return dateString.split('T')[0];
}

export function truncateText(text: string = '', maxLength = 120) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function isDigits(value: string) {
  return /^\d+$/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serialize(obj: any) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
}
