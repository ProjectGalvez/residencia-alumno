import { Carrera } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';

const useCrearCarrera = () => {
  return useCrearRecursoFormData<Carrera>('/carreras', 'listar-carrera');
};

export default useCrearCarrera;
