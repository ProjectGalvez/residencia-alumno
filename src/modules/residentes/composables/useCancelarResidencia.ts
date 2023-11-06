import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';

const cancelarResidencia = async (id: string) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Cancelando residencia',
    });
    await documentosApi.delete('residentes-cancelar/' + id);
    Loading.hide();
  } catch (error) {
    Loading.hide();
    throw error;
  }
};

const useCancelarResidencia = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(cancelarResidencia, {
    onSuccess: () => {
      Notify.create({
        message: 'Se canceló la residencia',
        color: 'positive',
        position: 'top-right',
        type: 'positive',
      });
      queryClient.invalidateQueries({
        queryKey: ['residentes'],
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
  return { cancelarResidencia: mutate };
};
export default useCancelarResidencia;
