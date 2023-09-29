import { Loading, Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const useRestaurarRecurso = (
  endpoint: string,
  queryKeyRestored: string,
  queryKeyUpdated: string
) => {
  const queryClient = useQueryClient();

  const restaurarRecursoFn = async (ids: string | string[]) => {
    try {
      Loading.show({
        delay: 500,
        message: 'Restaurando...',
      });
      const { data } = await documentosApi.patch(`${endpoint}`, {
        ids,
      });
      Loading.hide();
      return data;
    } catch (error) {
      Loading.hide();
      throw error;
    }
  };

  const { mutate, isLoading } = useMutation(restaurarRecursoFn, {
    onSuccess: () => {
      Notify.create({
        message: 'Se restauró correctamente',
        color: 'positive',
        position: 'top-right',
        type: 'positive',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeyUpdated],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeyRestored],
        exact: false,
      });
    },
    onError: (error) => {
      Notify.create({
        message: error + '',
        color: 'negative',
        position: 'top-right',
        type: 'negative',
      });
    },
  });
  return { restaurarRecurso: mutate, isLoading };
};

export default useRestaurarRecurso;
