import { Periodo } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerPeriodo = (id: string) => {
  return useRecursoIndividual<Periodo>('/periodos', id, ['periodos', id], {
    staleTime: 1000 * 60 * 60,
  });
};
export default useVerPeriodo;
