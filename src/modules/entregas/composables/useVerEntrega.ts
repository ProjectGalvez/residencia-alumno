import { Entrega } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerEntrega = (id: string) => {
  return useRecursoIndividual<Entrega>(
    '/entregas',
    id,
    ['entregas', id],
    {
      staleTime: 1000 * 60 * 60,
    },
    {
      included: 'estudiante,documento',
    }
  );
};
export default useVerEntrega;
