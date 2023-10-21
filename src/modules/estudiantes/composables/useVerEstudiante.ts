import { Estudiante } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerEstudiante = (id: string) => {
  return useRecursoIndividual<Estudiante>(
    '/estudiantes',
    id,
    ['estudiantes', id],
    {
      staleTime: 1000 * 60 * 60,
    },
    {
      included: 'user',
    }
  );
};
export default useVerEstudiante;
