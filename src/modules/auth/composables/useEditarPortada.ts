import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';
import { User } from 'src/modules/model/Model';

const setActualizarPortada = async (data: FormData) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Actualizando...',
    });
    data.append('_method', 'PUT');
    const { data: responseData } = await documentosApi.post<User>(
      'editar-portada',
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    Loading.hide();
    return responseData;
  } catch (error) {
    Loading.hide();
    throw error;
  }
};

const useEditarPortada = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(setActualizarPortada, {
    onSuccess: () => {
      Notify.create({
        message: 'Se actualizó la imagen de portada',
        color: 'positive',
        position: 'top-right',
        type: 'positive',
      });
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
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
    actalizarPortada: mutate,
    isLoadingPortada: isLoading,
    errorPortada: error,
  };
};
export default useEditarPortada;
