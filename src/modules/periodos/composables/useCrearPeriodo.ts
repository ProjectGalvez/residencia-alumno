import { Periodo } from 'src/modules/model/Model';
import { useCrearRecursoJson } from 'src/shared/composables/useCrearRecurso';

const useCrearPeriodo = () => {
  return useCrearRecursoJson<Periodo>('/periodos', 'listar-periodo');
};
export default useCrearPeriodo;
