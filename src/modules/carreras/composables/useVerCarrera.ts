import { Carrera } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerCarrera = (id: string) => {
  return useRecursoIndividual<Carrera>(
    '/carreras',
    id,
    ['carreras', id],
    {
      staleTime: 1000 * 15,
    },
    { included: 'departamento' }
  );
};

export default useVerCarrera;
