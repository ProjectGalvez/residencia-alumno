import useForzarEliminaciónRecurso from 'src/shared/composables/useForzarEliminaciónRecurso';

const useForzarEliminacionPeriodo = () => {
  return useForzarEliminaciónRecurso(
    'periodos-force-delete',
    'periodos-trashed'
  );
};
export default useForzarEliminacionPeriodo;
