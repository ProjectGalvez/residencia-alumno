import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarEstudiante = () => {
  return useEliminarRecurso('/estudiantes', 'Se eliminó el estudiante');
};
export default useEliminarEstudiante;
