import { ref } from 'vue';
import { useRouter } from 'vue-router';

import documentosApi from 'src/api/documentosApi';

const useLogout = () => {
  const isLoading = ref(false);
  const router = useRouter();

  const logout = async () => {
    isLoading.value = true;

    await documentosApi.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push({ name: 'home' });
  };
  return {
    logout,
    isLoading,
  };
};

export default useLogout;
