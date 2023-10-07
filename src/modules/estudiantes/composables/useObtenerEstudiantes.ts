import { Estudiante } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerEstudiantes = () => {
  return useRecursosMultiples<Estudiante[]>(
    '/estudiantes',
    ['estudiantes'],
    { included: 'user,carrera' },
    { staleTime: 1000 * 60 * 60 }
  );
};
export default useObtenerEstudiantes;
