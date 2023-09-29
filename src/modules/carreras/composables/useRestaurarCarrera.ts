import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarCarrera = () => {
  return useRestaurarRecurso(
    '/carreras-restore',
    'carreras',
    'carreras-trashed'
  );
};
export default useRestaurarCarrera;
