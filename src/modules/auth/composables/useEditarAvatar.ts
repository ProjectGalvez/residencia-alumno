import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';
import { User } from 'src/modules/model/Model';

const setActualizarAvatar = async (data: FormData) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Actualizando...',
    });
    data.append('_method', 'PUT');
    const { data: responseData } = await documentosApi.post<User>(
      'editar-avatar',
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

const useEditarAvatar = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(setActualizarAvatar, {
    onSuccess: () => {
      Notify.create({
        message: 'Se actualizó la foto de perfil',
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
    actalizarAvatar: mutate,
    isLoadingAvatar: isLoading,
    errorAvatar: error,
  };
};
export default useEditarAvatar;
