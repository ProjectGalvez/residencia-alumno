import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarProyecto = () => {
  return useEliminarRecurso('/proyectos', 'Se eliminó el proyecto');
};
export default useEliminarProyecto;
