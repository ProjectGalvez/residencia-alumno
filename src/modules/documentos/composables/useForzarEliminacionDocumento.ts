import useForzarEliminaciónRecurso from 'src/shared/composables/useForzarEliminaciónRecurso';

const useForzarEliminacionDocumento = () => {
  return useForzarEliminaciónRecurso(
    'documentos-force-delete',
    'documentos-trashed'
  );
};
export default useForzarEliminacionDocumento;
