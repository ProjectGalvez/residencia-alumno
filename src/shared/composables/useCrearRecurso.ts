import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import documentosApi from 'src/api/documentosApi';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const useCrearRecursoJson = <T>(endpoint: string, to: string) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const createResourceJSON = async (data: T) => {
    try {
      console.log('En el json', data);
      const { data: responseData } = await documentosApi.post<T>(
        endpoint,
        data
      );
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const resourceName = endpoint.replace(/^\//, '');
  const router = useRouter();
  const { mutate, isLoading, error, isSuccess } = useMutation(
    createResourceJSON,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resourceName],
          exact: false,
        });
        //queryClient.setQueryData([endpoint.replace(/^\//, '')], resource);
        router.push({ name: to });
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

const useCrearRecursoFormData = <T>(endpoint: string, to: string) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);
  const router = useRouter();
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
  const { mutate, isLoading, error, isSuccess, status } = useMutation(
    createResourceFormData,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [resourceName],
          exact: false,
        });
        //queryClient.setQueryData([resourceName], resource);
        router.push({ name: to });
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
    status,
  };
};

export { useCrearRecursoJson, useCrearRecursoFormData };
