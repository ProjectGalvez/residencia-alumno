import { Estudiante } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';

const useActualizarEstudiante = () => {
  return useActulizarRecursoFormData<Estudiante>(
    '/estudiantes',
    'listar-estudiante'
  );
};

export default useActualizarEstudiante;
