import useRestaurarRecurso from 'src/shared/composables/useRestaurarRecurso';

const useRestaurarEmpresa = () => {
  return useRestaurarRecurso(
    '/empresas-restore',
    'empresas',
    'empresas-trashed'
  );
};
export default useRestaurarEmpresa;
