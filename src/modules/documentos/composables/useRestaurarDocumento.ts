import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarDocumento = () => {
  return useRestaurarRecurso(
    '/documentos-restore',
    'documentos',
    'documentos-trashed'
  );
};
export default useRestaurarDocumento;
