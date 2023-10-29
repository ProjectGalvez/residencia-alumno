import { useMutation } from '@tanstack/vue-query';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import documentosApi from 'src/api/documentosApi';
import { User } from 'src/modules/model/Model';
import { ref } from 'vue';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const setActualizarPassword = async (data: FormData) => {
  try {
    Loading.show({
      delay: 500,
      message: 'Actualizando...',
    });
    data.append('_method', 'PUT');
    const { data: responseData } = await documentosApi.post<User>(
      'editar-password',
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

const useEditarPassword = () => {
  const router = useRouter();
  const errorServer = ref<ServerValidationError | unknown | null>(null);
  const { mutate, isLoading, error } = useMutation(setActualizarPassword, {
    onSuccess: () => {
      Notify.create({
        message: 'Se actualizó la contraseña',
        color: 'positive',
        position: 'top-right',
        type: 'positive',
      });
      router.push({ name: 'perfil-estudiante' });
    },
    onError: (err: AxiosError) => {
      Notify.create({
        message: err + '',
        color: 'negative',
        position: 'top-right',
        type: 'negative',
      });
      if (err.response) errorServer.value = err.response?.data;
      else errorServer.value = err;
    },
  });
  return {
    actalizarPassword: mutate,
    isLoadingPassword: isLoading,
    errorPassword: error,
    errorServer,
  };
};
export default useEditarPassword;
