import { User } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';

const useActualizarUser = () => {
  return useActulizarRecursoFormData<User>('/users', 'listar-usuario');
};
export default useActualizarUser;
