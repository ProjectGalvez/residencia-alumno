import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading, Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';

const useEliminarEntrega = (page: number) => {
  const queryClient = useQueryClient();

  const eliminarRecursoFn = async (id: string | number | string[]) => {
    try {
      Loading.show({
        delay: 500,
        message: 'Eliminando...',
      });
      await documentosApi.delete(`entregas/${id}`);
      Loading.hide();
    } catch (error) {
      Loading.hide();
      throw error;
    }
  };

  const { mutate, isLoading, error, isSuccess } = useMutation(
    eliminarRecursoFn,
    {
      onSuccess: () => {
        Notify.create({
          message: 'Se eliminó la entrega',
          color: 'positive',
          position: 'top-right',
          type: 'positive',
        });
        queryClient.invalidateQueries({
          queryKey: ['entregas', page],
        });
        queryClient.invalidateQueries({
          queryKey: ['entregas-trashed'],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ['entrega-por-residente'],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ['documentos-pendientes'],
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
export default useEliminarEntrega;
