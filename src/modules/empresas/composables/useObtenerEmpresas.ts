import { Empresa } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerEmpresas = () => {
  return useRecursosMultiples<Empresa[]>(
    '/empresas',
    ['empresas'],
    {},
    { staleTime: 1000 * 60 * 60 }
  );
};
export default useObtenerEmpresas;
