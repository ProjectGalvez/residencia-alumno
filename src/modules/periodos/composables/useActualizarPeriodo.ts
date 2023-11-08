import { useQueryClient } from '@tanstack/vue-query';
import { Periodo } from 'src/modules/model/Model';
import { useActulizarRecursoJson } from 'src/shared/composables/useActualizarRecurso';
const useActualizarPeriodo = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['periodo-activo'],
    exact: false,
  });
  return useActulizarRecursoJson<Periodo>('/periodos', 'listar-periodo');
};
export default useActualizarPeriodo;
