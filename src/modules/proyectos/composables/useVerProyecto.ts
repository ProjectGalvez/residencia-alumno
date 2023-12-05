import { Proyecto } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerProyecto = (id: string) => {
  return useRecursoIndividual<Proyecto>(
    '/proyectos',
    id,
    ['proyectos', id],
    {
      staleTime: 1000 * 60 * 60,
    },
    {
      included: 'carrera',
    }
  );
};
export default useVerProyecto;
