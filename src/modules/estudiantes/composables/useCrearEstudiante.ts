import { Estudiante } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';

const useCrearEstudiante = () => {
  return useCrearRecursoFormData<Estudiante>(
    '/estudiantes',
    'listar-estudiante'
  );
};
export default useCrearEstudiante;
