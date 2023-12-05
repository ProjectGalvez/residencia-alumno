import { Estudiante } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerEstudianteFull = (id: string) => {
  return useRecursoIndividual<Estudiante>(
    '/estudiantes',
    id,
    ['estudiantes', id],
    {
      staleTime: 1000 * 60 * 60,
    },
    {
      included: 'user,carrera,empresa,periodo',
    }
  );
};
export default useVerEstudianteFull;
