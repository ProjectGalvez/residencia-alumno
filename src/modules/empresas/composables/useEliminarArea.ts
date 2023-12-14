import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading, Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';

const eliminarArea = async (id: string | number | string[]) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Eliminando...',
    });
    await documentosApi.delete('/areas/' + id);
    Loading.hide();
  } catch (error) {
    Loading.hide();
    throw error;
  }
};

const useEliminarArea = (idEmpresa: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(eliminarArea, {
    onSuccess: () => {
      Notify.create({
        message: 'Se eliminó con éxito',
        color: 'positive',
        position: 'top-right',
        type: 'positive',
      });
      queryClient.invalidateQueries({
        queryKey: ['areas', idEmpresa],
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
  return { eliminarArea: mutate };
};
export default useEliminarArea;
