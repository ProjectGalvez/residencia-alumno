import { useQueryClient } from '@tanstack/vue-query';
import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarPeriodo = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['periodo-activo'],
    exact: false,
  });
  return useEliminarRecurso('/periodos', 'Se eliminó el periodo');
};
export default useEliminarPeriodo;
