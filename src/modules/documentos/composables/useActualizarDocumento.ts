import { Documento } from 'src/modules/model/Model';
import { useActulizarRecursoFormData } from 'src/shared/composables/useActualizarRecurso';

const useActualizarDocumento = () => {
  return useActulizarRecursoFormData<Documento>(
    '/documentos',
    'listar-documento'
  );
};
export default useActualizarDocumento;
