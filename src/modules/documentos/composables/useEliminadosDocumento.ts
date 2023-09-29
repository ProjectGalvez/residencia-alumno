import { Documento } from 'src/modules/model/Model';
import useRecursosEliminados from 'src/shared/composables/useRecursosEliminados';

const useEliminadosDocumento = () => {
  return useRecursosEliminados<Documento[]>(
    'documentos-trashed',
    ['documentos-trashed'],
    {},
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};

export default useEliminadosDocumento;
