import { Periodo } from 'src/modules/model/Model';
import { useActulizarRecursoJson } from 'src/shared/composables/useActualizarRecurso';
const useActualizarPeriodo = () => {
  return useActulizarRecursoJson<Periodo>('/periodos', 'listar-periodo');
};
export default useActualizarPeriodo;
