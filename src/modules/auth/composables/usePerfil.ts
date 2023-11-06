import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { User } from 'src/modules/model/Model';

const getUser = async (): Promise<User> => {
  const { data } = await documentosApi.get<User>('current-user');
  return data;
};

const usePerfil = () => {
  const user = ref<User>();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['current-user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });
  watch(
    data,
    () => {
      if (data.value) {
        user.value = { ...data.value };
      }
    },
    { immediate: true }
  );
  return { isLoading, isError, user };
};
export default usePerfil;
