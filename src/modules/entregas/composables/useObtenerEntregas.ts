import { Entrega } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerEntregas = () => {
  return useRecursosMultiples<Entrega[]>(
    '/entregas',
    ['entregas'],
    {
      included: 'estudiante,documento',
    },
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useObtenerEntregas;
