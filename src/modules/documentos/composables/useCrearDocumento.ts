import { Documento } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';
import { useQueryClient } from '@tanstack/vue-query';

const useCrearDocumento = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['documentos-pendientes'],
    exact: false,
  });
  return useCrearRecursoFormData<Documento>('/documentos', 'listar-documento');
};
export default useCrearDocumento;
