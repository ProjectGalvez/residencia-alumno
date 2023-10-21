import { Entrega } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';

const useActualizarEntrega = () => {
  return useActulizarRecursoFormData<Entrega>('/entregas', 'listar-entrega');
};
export default useActualizarEntrega;
