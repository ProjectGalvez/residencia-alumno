import { Empresa } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosEmpresa = () => {
  return useRecursosEliminados<Empresa[]>(
    'empresas-trashed',
    ['empresas-trashed'],
    {},
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useEliminadosEmpresa;
