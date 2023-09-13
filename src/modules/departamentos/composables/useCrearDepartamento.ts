import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import documentosApi from 'src/api/documentosApi';
import { Departamento } from 'src/modules/model/Model';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { ref } from 'vue';

const crearDepartamento = async (
  departamento: Departamento
): Promise<Departamento> => {
  try {
    const { data } = await documentosApi.post<Departamento>(
      '/departamentos',
      departamento
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const useCrearDepartamento = () => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const { mutate, isLoading, error, isSuccess } = useMutation(
    crearDepartamento,
    {
      onSuccess: (depto) => {
        queryClient.invalidateQueries({
          queryKey: ['departamentos'],
          exact: false,
        });
        queryClient.setQueryData(['departamentos', depto.id], depto);
      },
      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data;
        else errorServer.value = err;
      },
    }
  );
  return {
    crearDepartamento: mutate,
    isLoadingMutate: isLoading,
    error,
    errorServer,
    isSuccess,
  };
};

export default useCrearDepartamento;
