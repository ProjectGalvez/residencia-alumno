import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';

// Define una función genérica para obtener un recurso con parámetros
const getResource = async <T>(
  endpoint: string,
  id: string,
  params?: Record<string, any>
): Promise<T> => {
  const { data } = await documentosApi.get<T>(`${endpoint}/${id}`, {
    params,
  });
  return data;
};

const useRecursoIndividual = <T>(
  endpoint: string,
  id: string,
  queryKey: string[],
  options?: any,
  params?: Record<string, any>
) => {
  const resource = ref<T>();
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => getResource<T>(endpoint, id, params),
    options
  );
  watch(
    data,
    () => {
      if (data.value) {
        resource.value = { ...data.value };
      }
    },
    { immediate: true }
  );
  return { resource, isLoading, error };
};

export default useRecursoIndividual;
