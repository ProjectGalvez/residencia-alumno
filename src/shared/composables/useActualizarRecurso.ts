import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ServerValidationError } from '../helpers/errorUtils';
import documentosApi from 'src/api/documentosApi';
import { ref } from 'vue';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const useActulizarRecursoFormData = <T>(endpoint: string, to: string) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const actualizarRecurso = async (data: FormData) => {
    try {
      data.append('_method', 'PUT');
      const { data: responseData } = await documentosApi.post<T>(
        `${endpoint}/${data.get('id')}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return responseData;
    } catch (error) {
      throw error;
    }
  };
  const router = useRouter();
  const resourceName = endpoint.replace(/^\//, '');
  const { mutate, isLoading, error, isSuccess } = useMutation(
    actualizarRecurso,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resourceName],
          exact: false,
        });
        router.push({ name: to });
        //queryClient.setQueryData([resourceName], resource);
      },
      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data;
        else errorServer.value = err;
      },
    }
  );

  return {
    actalizarRecurso: mutate,
    isLoadingActualizar: isLoading,
    error,
    errorServer,
    isSuccess,
  };
};

const useActulizarRecursoJson = <T extends { id: number | string }>(
  endpoint: string,
  to: string
) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const actualizarRecurso = async (data: T) => {
    try {
      const { data: responseData } = await documentosApi.patch<T>(
        `${endpoint}/${data.id}`,
        data
      );
      return responseData;
    } catch (error) {
      throw error;
    }
  };
  const router = useRouter();
  const resourceName = endpoint.replace(/^\//, '');
  const { mutate, isLoading, error, isSuccess } = useMutation(
    actualizarRecurso,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resourceName],
          exact: false,
        });
        router.push({ name: to });
        //queryClient.setQueryData([resourceName], resource);
      },
      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data;
        else errorServer.value = err;
      },
    }
  );

  return {
    actalizarRecurso: mutate,
    isLoadingActualizar: isLoading,
    error,
    errorServer,
    isSuccess,
  };
};
export { useActulizarRecursoFormData, useActulizarRecursoJson };
