import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarEstudiante = () => {
  return useRestaurarRecurso(
    '/estudiantes-restore',
    'estudiantes',
    'estudiantes-trashed'
  );
};
export default useRestaurarEstudiante;
