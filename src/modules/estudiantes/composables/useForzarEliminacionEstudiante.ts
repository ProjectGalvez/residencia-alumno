import useForzarEliminaciónRecurso from 'src/shared/composables/useForzarEliminaciónRecurso';

const useForzarEliminacionEstudiante = () => {
  return useForzarEliminaciónRecurso(
    'estudiantes-force-delete',
    'estudiantes-trashed'
  );
};
export default useForzarEliminacionEstudiante;
