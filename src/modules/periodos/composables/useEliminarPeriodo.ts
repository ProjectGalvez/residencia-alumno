import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarPeriodo = () => {
  return useEliminarRecurso('/periodos', 'Se eliminó el periodo');
};
export default useEliminarPeriodo;
