import { Area } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerArea = (id: string) => {
  return useRecursoIndividual<Area>('/areas', id, ['areas', id], {
    staleTime: 1000 * 60 * 60,
  });
};
export default useVerArea;
