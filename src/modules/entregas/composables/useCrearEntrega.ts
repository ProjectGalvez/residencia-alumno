import { Entrega } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';

const useCrearEntrega = () => {
  return useCrearRecursoFormData<Entrega>('/entregas', 'listar-entrega');
};
export default useCrearEntrega;
