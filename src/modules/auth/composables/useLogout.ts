import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

import documentosApi from 'src/api/documentosApi';

const useLogout = () => {
  const isLoading = ref(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    isLoading.value = true;

    await documentosApi.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push({ name: 'home' });
    queryClient.clear();
  };
  return {
    logout,
    isLoading,
  };
};

export default useLogout;
