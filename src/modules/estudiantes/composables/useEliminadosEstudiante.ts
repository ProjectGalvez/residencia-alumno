import { Estudiante } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosEstudiante = () => {
  return useRecursosEliminados<Estudiante>(
    'estudiantes-trashed',
    ['estudiantes-trashed'],
    { included: 'user,carrera' },
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useEliminadosEstudiante;
