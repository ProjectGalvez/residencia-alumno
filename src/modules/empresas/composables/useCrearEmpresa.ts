import { Empresa } from 'src/modules/model/Model';
import { useCrearRecursoJson } from 'src/shared/composables/useCrearRecurso';
const useCrearEmpresa = () => {
  return useCrearRecursoJson<Empresa>('/empresas', 'listar-empresa');
};
export default useCrearEmpresa;
