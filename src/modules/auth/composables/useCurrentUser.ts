import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';

import { AuthUser } from 'src/modules/model/Model';

const getCurrentUser = async (): Promise<AuthUser> => {
  const { data } = await documentosApi.get<AuthUser>('/current-user');
  return data;
};

const useCurrentUser = () => {
  const currentUser = ref<AuthUser>();
  const { data, isLoading } = useQuery(['current-user'], getCurrentUser, {
    staleTime: 1000 * 60 * 60,
  });

  watch(data, () => {
    if (data.value) currentUser.value = data.value;
  });

  return {
    currentUser,
    isLoading,
  };
};

export default useCurrentUser;
