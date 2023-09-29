import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';

const getEliminados = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T[]> => {
  try {
    const { data } = await documentosApi.get<T[]>(endpoint, { params });
    return data;
  } catch (error) {
    throw error;
  }
};
const useRecursosEliminados = <T>(
  endpoint: string,
  queryKey: string[],
  params?: Record<string, any>,
  options?: any
) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    queryKey,
    () => getEliminados(endpoint, params),
    options
  );
  return { data, isLoading, error, isSuccess };
};

export default useRecursosEliminados;
