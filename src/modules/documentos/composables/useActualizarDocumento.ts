import { Documento } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';
import { useQueryClient } from '@tanstack/vue-query';

const useActualizarDocumento = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['documentos-pendientes'],
    exact: false,
  });
  return useActulizarRecursoFormData<Documento>(
    '/documentos',
    'listar-documento'
  );
};
export default useActualizarDocumento;
