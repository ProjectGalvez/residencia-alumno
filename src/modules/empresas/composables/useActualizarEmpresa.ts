import { Empresa } from 'src/modules/model/Model';
import { useActulizarRecursoJson } from 'src/shared/composables/useActualizarRecurso';
const useActualizarEmpresa = () => {
  return useActulizarRecursoJson<Empresa>('/empresas', 'listar-empresa');
};
export default useActualizarEmpresa;
