import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import documentosApi from 'src/api/documentosApi';
import { Entrega } from 'src/modules/model/Model';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const useCrearEntregaEst = (idEstudiante: string) => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);
  const router = useRouter();
  const createResourceFormData = async (data: FormData) => {
    try {
      const { data: responseData } = await documentosApi.post<Entrega>(
        '/entregas',
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

  const { mutate, isLoading, error, isSuccess, status } = useMutation(
    createResourceFormData,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['entregas'],
          exact: false,
        });
        //queryClient.setQueryData([resourceName], resource);
        router.push({ name: 'ver-estudiante', params: { id: idEstudiante } });
      },
      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data;
        else errorServer.value = err;
      },
    }
  );

  return {
    createEntrega: mutate,
    isLoadingCreate: isLoading,
    error,
    errorServer,
    isSuccess,
    status,
  };
};
export default useCrearEntregaEst;
