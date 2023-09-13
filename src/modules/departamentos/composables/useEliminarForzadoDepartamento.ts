import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading, Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';

const eliminarDepartamento = async (ids: string | string[]) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Eliminando...',
    });
    await documentosApi.delete('/departamentos-force-delete', {
      params: { ids },
    });
    Loading.hide();
  } catch (e) {
    throw e;
  }
};
const useEliminarForzadoDepartamento = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error, isSuccess } = useMutation(
    eliminarDepartamento,
    {
      onSuccess: () => {
        Notify.create({
          message: 'Se eliminó',
          color: 'positive',
          position: 'top-right',
          type: 'positive',
        });
        queryClient.invalidateQueries({
          queryKey: ['departamentos_eliminados'],
          exact: false,
        });
      },
    }
  );
  return {
    eliminarDepartamento: mutate,
    loadingEliminar: isLoading,
    error,
    isSuccesEliminar: isSuccess,
  };
};

export default useEliminarForzadoDepartamento;
