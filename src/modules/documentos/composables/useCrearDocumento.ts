import { Documento } from 'src/modules/model/Model';
import { useCrearRecursoFormData } from 'src/shared/composables/useCrearRecurso';

const useCrearDocumento = () => {
  return useCrearRecursoFormData<Documento>('/documentos', 'listar-documento');
};
export default useCrearDocumento;
