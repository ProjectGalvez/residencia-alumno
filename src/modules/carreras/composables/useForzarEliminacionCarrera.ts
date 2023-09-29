import useForzarEliminaciónRecurso from 'src/shared/composables/useForzarEliminaciónRecurso';

const useForzarEliminacionCarrera = () => {
  return useForzarEliminaciónRecurso(
    'carreras-force-delete',
    'carreras-trashed'
  );
};
export default useForzarEliminacionCarrera;
