import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarEmpresa = () => {
  return useEliminarRecurso('/empresas', 'Se eliminó la empresa');
};
export default useEliminarEmpresa;
