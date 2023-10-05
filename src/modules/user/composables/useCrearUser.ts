import { User } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';

const useCrearUser = () => {
  return useCrearRecursoFormData<User>('/users', 'listar-usuario');
};
export default useCrearUser;
