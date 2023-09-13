import useEliminarRecurso from 'src/shared/composables/useEliminarRecurso';

const useEliminarCarrera = () => {
  return useEliminarRecurso('/carreras', 'Se elminó la carrera');
};

export default useEliminarCarrera;
