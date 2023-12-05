import { Proyecto } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerProyectos = () => {
  return useRecursosMultiples<Proyecto>(
    '/proyectos',
    ['proyectos'],
    {},
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useObtenerProyectos;
