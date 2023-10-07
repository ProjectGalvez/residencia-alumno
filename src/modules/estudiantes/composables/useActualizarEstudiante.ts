import { Estudiante } from 'src/modules/model/Model';
import { useActulizarRecursoJson } from 'src/shared/composables/useActualizarRecurso';

const useActualizarEstudiante = () => {
  return useActulizarRecursoJson<Estudiante>(
    '/estudiantes',
    'listar-estudiante'
  );
};

export default useActualizarEstudiante;
