import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarAsesor = () => {
  return useEliminarRecurso('/asesores', 'Se eliminó el asesor interno');
};
export default useEliminarAsesor;
