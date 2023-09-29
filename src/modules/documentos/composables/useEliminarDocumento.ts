import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarDocumento = () => {
  return useEliminarRecurso('/documentos', 'Se eliminó el documento');
};
export default useEliminarDocumento;
