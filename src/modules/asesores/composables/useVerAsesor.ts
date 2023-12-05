import { Asesor } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerAsesor = (id: string) => {
  return useRecursoIndividual<Asesor>('/asesores', id, ['asesores', id], {
    staleTime: 1000 * 60 * 60,
  });
};
export default useVerAsesor;
