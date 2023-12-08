import { ApiResponse } from './models';

interface GetProps<T> {
  url: string;
  setLoading?: (loading: boolean) => void;
  setSuccess?: (success: boolean) => void;
  setData: (data: T) => void;
  setMessage?: (message: string) => void;
}

interface PostProps<P, R> extends GetProps<R> {
  body: P;
}

export function get<T>({
  url,
  setLoading = () => {},
  setSuccess = () => {},
  setData,
  setMessage = () => {},
}: GetProps<T>) {
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res: ApiResponse<T>) => {
      setLoading(false);
      setSuccess(res.success);

      if (res.success) {
        setData(res.data);
      } else {
        setMessage(res.message);
      }
    });
}

export function post<P, R>({
  url,
  setLoading = () => {},
  setSuccess = () => {},
  setData,
  setMessage = () => {},
  body,
}: PostProps<P, R>) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res: ApiResponse<R>) => {
      setLoading(false);
      setSuccess(res.success);

      if (res.success) {
        setData(res.data);
      } else {
        setMessage(res.message);
      }
    });
}
