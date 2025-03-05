import { useSearchParams } from 'next/navigation';

export const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = (params: Record<string, string>): string => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    return search ? `?${search}` : '';
  };

  const removeParams = (paramsToRemove: string[]): string => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    paramsToRemove.forEach(param => {
      current.delete(param);
    });

    const search = current.toString();
    return search ? `?${search}` : '';
  };

  return { createQueryString, removeParams };
};
