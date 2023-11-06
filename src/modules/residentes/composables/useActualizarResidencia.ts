import { useMutation, useQueryClient } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const actualizarResidencia = async (residente: FormData) => {
  const { data } = await documentosApi.post(
    'residentes-actualizar',
    residente,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return data;
};

const useActualizarResidencia = (id: string) => {
  const errorServer = ref<ServerValidationError | unknown | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(actualizarResidencia, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['residentes'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['residente', id],
        exact: false,
      });
      router.push({ name: 'listar-residente' });
    },
    onError: (err: AxiosError) => {
      if (err.response) errorServer.value = err.response?.data;
      else errorServer.value = err;
    },
  });
  return { mutate, errorServer, isLoading };
};
export default useActualizarResidencia;
