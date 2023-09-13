import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import documentosApi from 'src/api/documentosApi';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { ref } from 'vue';

const useCrearRecursoJson = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const createResourceJSON = async (data: T) => {
    try {
      const { data: responseData } = await documentosApi.post<T>(
        endpoint,
        JSON.stringify(data)
      );
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const resourceName = endpoint.replace(/^\//, '');
  const { mutate, isLoading, error, isSuccess } = useMutation(
    createResourceJSON,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resourceName],
          exact: false,
        });
        //queryClient.setQueryData([endpoint.replace(/^\//, '')], resource);
      },
      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data;
        else errorServer.value = err;
      },
    }
  );

  return {
    createResource: mutate,
    isLoadingCreate: isLoading,
    error,
    errorServer,
    isSuccess,
  };
};

const useCrearRecursoFormData = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const createResourceFormData = async (data: FormData) => {
    try {
      const { data: responseData } = await documentosApi.post<T>(
        endpoint,
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

  const resourceName = endpoint.replace(/^\//, '');
  const { mutate, isLoading, error, isSuccess } = useMutation(
    createResourceFormData,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resourceName],
          exact: false,
        });
        //queryClient.setQueryData([resourceName], resource);
      },
      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data;
        else errorServer.value = err;
      },
    }
  );

  return {
    createResource: mutate,
    isLoadingCreate: isLoading,
    error,
    errorServer,
    isSuccess,
  };
};

export { useCrearRecursoJson, useCrearRecursoFormData };
