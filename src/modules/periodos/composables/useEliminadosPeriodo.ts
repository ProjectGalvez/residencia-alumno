import { useQueryClient } from '@tanstack/vue-query';
import { Periodo } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosPeriodo = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['periodo-activo'],
    exact: false,
  });
  return useRecursosEliminados<Periodo[]>(
    'periodos-trashed',
    ['periodos-trashed'],
    {},
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useEliminadosPeriodo;
