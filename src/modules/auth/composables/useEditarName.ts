import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';
import { User } from 'src/modules/model/Model';

const setActualizarName = async (data: FormData) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Actualizando...',
    });
    data.append('_method', 'PUT');
    const { data: responseData } = await documentosApi.post<User>(
      'editar-name',
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

const useEditarName = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(setActualizarName, {
    onSuccess: () => {
      Notify.create({
        message: 'Se actualizó el nombre del usuario',
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
    actalizarName: mutate,
    isLoadingName: isLoading,
    errorName: error,
  };
};
export default useEditarName;
