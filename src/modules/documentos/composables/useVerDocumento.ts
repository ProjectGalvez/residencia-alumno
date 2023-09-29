import { Documento } from 'src/modules/model/Model';
import useRecursoIndividual from 'src/shared/composables/useRecursoIndividual';

const useVerDocumento = (id: string) => {
  return useRecursoIndividual<Documento>(
    '/documentos',
    id,
    ['documentos', id],
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
export default useVerDocumento;
