import { Carrera } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosCarrera = () => {
  return useRecursosEliminados<Carrera[]>(
    'carreras-trashed',
    ['carreras-trashed'],
    { included: 'departamento' },
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};

export default useEliminadosCarrera;
