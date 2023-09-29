import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';

import documentosApi from 'src/api/documentosApi';
const eliminarDepartamento = async (id: string) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Eliminando...',
    });
    await documentosApi.delete(`/departamentos/${id}`);
    Loading.hide();
  } catch (e) {
    throw e;
  }
};

const useEliminarDepartmento = () => {
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
          queryKey: ['departamentos'],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ['departamentos-trashed'],
          exact: false,
        });
      },
    }
  );
  return {
    eliminarDepartamento: mutate,
    loadingEliminar: isLoading,
    error,
    isSuccess,
  };
};

export default useEliminarDepartmento;
