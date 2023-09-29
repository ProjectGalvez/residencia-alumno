import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';

const useForzarEliminaciónRecurso = (endpoint: string, queryKey: string) => {
  const queryClient = useQueryClient();
  const eliminarRecursoFn = async (ids: string | number | string[]) => {
    try {
      Loading.show({
        delay: 500,
        message: 'Eliminando...',
      });
      await documentosApi.delete(endpoint, {
        params: { ids },
      });
      Loading.hide();
    } catch (error) {
      Loading.hide();
      throw error;
    }
  };

  const { mutate, isLoading } = useMutation(eliminarRecursoFn, {
    onSuccess: () => {
      Notify.create({
        message: 'Se eliminó correctamente',
        color: 'positive',
        position: 'top-right',
        type: 'positive',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey],
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

  return {
    eliminarRecurso: mutate,
    isLoading,
  };
};

export default useForzarEliminaciónRecurso;
