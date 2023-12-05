import { Entrega } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';
import { useQueryClient } from '@tanstack/vue-query';

const useCrearEntrega = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['documentos-pendientes'],
    exact: false,
  });
  queryClient.invalidateQueries({
    queryKey: ['residentes'],
    exact: false,
  });
  return useCrearRecursoFormData<Entrega>('/entregas', 'listar-entrega');
};
export default useCrearEntrega;
