import { useQueryClient } from '@tanstack/vue-query';
import { Asesor } from 'src/modules/model/Model';
import { useActulizarRecursoJson } from 'src/shared/composables/useActualizarRecurso';

const useActualizarAsesor = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['asesores'],
    exact: false,
  });
  return useActulizarRecursoJson<Asesor>('/asesores', 'listar-asesor');
};
export default useActualizarAsesor;
