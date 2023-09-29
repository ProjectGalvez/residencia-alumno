import { Periodo } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerPeriodos = () => {
  return useRecursosMultiples<Periodo[]>(
    '/periodos',
    ['periodos'],
    {},
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useObtenerPeriodos;
