import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarDepartamento = () => {
  return useRestaurarRecurso(
    '/departamentos-restore',
    'departamentos',
    'departamentos-trashed'
  );
};
export default useRestaurarDepartamento;
