import { useQueryClient } from '@tanstack/vue-query';
import { Periodo } from 'src/modules/model/Model';
import { useCrearRecursoJson } from 'src/shared/composables/useCrearRecurso';

const useCrearPeriodo = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['periodo-activo'],
    exact: false,
  });
  return useCrearRecursoJson<Periodo>('/periodos', 'listar-periodo');
};
export default useCrearPeriodo;
