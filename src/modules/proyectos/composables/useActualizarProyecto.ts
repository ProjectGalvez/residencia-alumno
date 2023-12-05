import { useQueryClient } from '@tanstack/vue-query';
import { Proyecto } from 'src/modules/model/Model';
import { useActulizarRecursoJson } from 'src/shared/composables/useActualizarRecurso';

const useActualizarProyecto = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['residentes'],
    exact: false,
  });
  return useActulizarRecursoJson<Proyecto>('/proyectos', 'listar-proyecto');
};
export default useActualizarProyecto;
