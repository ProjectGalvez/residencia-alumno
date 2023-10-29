import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Estudiante } from 'src/modules/model/Model';

const getEstudiante = async (): Promise<Estudiante> => {
  const { data } = await documentosApi.get<Estudiante>('estudiante-datos', {
    params: {
      included: 'carrera',
    },
  });
  return data;
};

const useEstudiante = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['estudiante-datos'],
    queryFn: getEstudiante,
  });
  return { isLoading, isError, data };
};
export default useEstudiante;
