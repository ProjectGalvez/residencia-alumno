import useForzarEliminaciónRecurso from 'src/shared/composables/useForzarEliminaciónRecurso';

const useForzarEliminacionEmpresa = () => {
  return useForzarEliminaciónRecurso(
    'empresas-force-delete',
    'empresas-trashed'
  );
};
export default useForzarEliminacionEmpresa;
