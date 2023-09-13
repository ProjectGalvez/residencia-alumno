import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import documentosApi from 'src/api/documentosApi';
import { Departamento } from 'src/modules/model/Model';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { ref } from 'vue';

const actualizarDepartamento = async (
  departamento: Departamento
): Promise<Departamento> => {
  try {
    const { data } = await documentosApi.patch<Departamento>(
      `/departamentos/${departamento.id}`,
      departamento
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const useActualizarDepartamento = () => {
  const queryClient = useQueryClient();
  const errorServer = ref<ServerValidationError | unknown | null>(null);

  const { mutate, isLoading, error, isSuccess } = useMutation(
    actualizarDepartamento,
    {
      onSuccess: (depto) => {
        queryClient.invalidateQueries({
          queryKey: ['departamentos'],
          exact: false,
        });
        queryClient.setQueryData(['departamentos', depto.id], depto);
      },

      onError: (err: AxiosError) => {
        if (err.response) errorServer.value = err.response?.data as AxiosError;
        else errorServer.value = err;
      },
    }
  );
  return {
    actualizarDepartamento: mutate,
    isLoadingMutate: isLoading,
    error,
    errorServer,
    isSuccess,
  };
};

/* const actualizarDepartamento = async (
  departamento: FormData
): Promise<Departamento> => {
  const id = departamento.get('id');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const { data } = await documentosApi.post<Departamento>(
    `/departamentos/${id}`,
    departamento,
    config
  );
  console.log(data);
  return data;
}; */

export default useActualizarDepartamento;
