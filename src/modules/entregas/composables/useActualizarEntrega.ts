import { Entrega } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';
import { useQueryClient } from '@tanstack/vue-query';

const useActualizarEntrega = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ['documentos-pendientes'],
    exact: false,
  });
  return useActulizarRecursoFormData<Entrega>('/entregas', 'listar-entrega');
};
export default useActualizarEntrega;
