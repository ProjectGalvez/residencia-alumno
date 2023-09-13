import { Carrera } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerCarreras = () => {
  return useRecursosMultiples<Carrera[]>(
    '/carreras',
    ['carreras'],
    { included: 'departamento' },
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};

export default useObtenerCarreras;
