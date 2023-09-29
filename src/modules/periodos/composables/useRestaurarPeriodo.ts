import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarPeriodo = () => {
  return useRestaurarRecurso(
    '/periodos-restore',
    'periodos',
    'periodos-trashed'
  );
};
export default useRestaurarPeriodo;
