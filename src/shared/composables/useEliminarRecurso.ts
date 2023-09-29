import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';

const useEliminarRecurso = (endpoint: string, mensaje: string) => {
  const queryClient = useQueryClient();

  const eliminarRecursoFn = async (id: string | number | string[]) => {
    try {
      Loading.show({
        delay: 500,
        message: 'Eliminando...',
      });
      await documentosApi.delete(`${endpoint}/${id}`);
      Loading.hide();
    } catch (error) {
      Loading.hide();
      throw error;
    }
  };

  const resource = endpoint.replace(/^\//, '');
  const { mutate, isLoading, error, isSuccess } = useMutation(
    eliminarRecursoFn,
    {
      onSuccess: () => {
        Notify.create({
          message: mensaje,
          color: 'positive',
          position: 'top-right',
          type: 'positive',
        });
        queryClient.invalidateQueries({
          queryKey: [resource],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: [`${resource}-trashed`],
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
    }
  );

  return {
    eliminarRecurso: mutate,
    loadingEliminar: isLoading,
    error,
    isSuccess,
  };
};

export default useEliminarRecurso;
