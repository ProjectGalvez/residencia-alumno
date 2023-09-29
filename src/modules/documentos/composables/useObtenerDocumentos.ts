import { Documento } from 'src/modules/model/Model';
import useRecursosMultiples from 'src/shared/composables/useRecursosMultiples';

const useObtenerDocumentos = () => {
  return useRecursosMultiples<Documento[]>(
    '/documentos',
    ['documentos'],
    {},
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useObtenerDocumentos;
