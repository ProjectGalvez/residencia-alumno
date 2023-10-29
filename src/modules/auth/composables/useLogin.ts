import { LocalStorage } from 'quasar';
import documentosApi from 'src/api/documentosApi';
import { AuthUser } from 'src/modules/model/Model';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface ErrorResponse {
  message: string;
  errors: string[];
}

const useLogin = () => {
  const error = ref<ErrorResponse | null>(null);
  const isLoading = ref(false);
  const hasError = ref(false);
  const router = useRouter();

  const redireccionarSegunRol = (roles: string[]) => {
    if (roles.includes('admin')) {
      router.push({ name: 'dashboard-home' });
    } else if (roles.includes('capturista')) {
      router.push({ name: 'dashboard-home' });
    } else if (roles.includes('estudiante')) {
      router.push({ name: 'dashboard-estudiante' });
    } else {
      router.push({ name: 'not-found' });
    }
  };

  const login = async (
    email: string,
    password: string,
    device_name: string
  ) => {
    hasError.value = false;
    isLoading.value = true;
    await documentosApi
      .post('/login', {
        email,
        password,
        device_name,
      })
      .then((response) => {
        const user: AuthUser = response.data;

        LocalStorage.set('token', user.user_token);
        LocalStorage.set('user', JSON.stringify(user));
        redireccionarSegunRol(user.role);
        isLoading.value = false;
      })
      .catch((err) => {
        console.log(err);
        error.value = err.response.data;
        hasError.value = true;
        isLoading.value = false;
      });
  };

  return { isLoading, error, hasError, login };
};

export default useLogin;
