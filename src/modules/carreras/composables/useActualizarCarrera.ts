import { Carrera } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';

const useActualizarCarrera = () => {
  return useActulizarRecursoFormData<Carrera>('/carreras', 'listar-carrera');
};
export default useActualizarCarrera;
