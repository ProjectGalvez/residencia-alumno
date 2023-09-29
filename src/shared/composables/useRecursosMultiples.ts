import documentosApi from 'src/api/documentosApi';
import { useQuery } from '@tanstack/vue-query';

// Define una función genérica para obtener recursos con parámetros
const getResource = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T[]> => {
  const { data } = await documentosApi.get<T[]>(endpoint, {
    params,
  });
  return data;
};

const useRecursosMultiples = <T>(
  endpoint: string,
  queryKey: string[],
  params?: Record<string, any>,
  options?: any
) => {
  const { data, isLoading } = useQuery(
    queryKey,
    () => getResource<T>(endpoint, params),
    options
  );

  return { data, isLoading };
};

export default useRecursosMultiples;
