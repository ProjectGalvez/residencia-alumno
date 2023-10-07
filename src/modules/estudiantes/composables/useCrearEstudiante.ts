import { Estudiante } from 'src/modules/model/Model';
import { useCrearRecursoJson } from 'src/shared/composables/useCrearRecurso';

const useCrearEstudiante = () => {
  return useCrearRecursoJson<Estudiante>('/estudiantes', 'listar-estudiante');
};
export default useCrearEstudiante;
