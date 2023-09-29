import { Periodo } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosPeriodo = () => {
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
