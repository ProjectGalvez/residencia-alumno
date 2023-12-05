import { Proyecto } from 'src/modules/model/Model';
import { useCrearRecursoJson } from 'src/shared/composables/useCrearRecurso';
const useCrearProyecto = () => {
  return useCrearRecursoJson<Proyecto>('/proyectos', 'listar-proyecto');
};
export default useCrearProyecto;
