import { Asesor } from 'src/modules/model/Model';
import { useCrearRecursoJson } from 'src/shared/composables/useCrearRecurso';
const useCrearAsesor = () => {
  return useCrearRecursoJson<Asesor>('/asesores', 'listar-asesor');
};
export default useCrearAsesor;
