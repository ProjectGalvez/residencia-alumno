import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Carrera } from 'src/modules/model/Model';

const getCarrera = async (): Promise<Carrera> => {
  const { data } = await documentosApi.get<Carrera>('estudiante-carrera');
  return data;
};

const useCarreraEstudiante = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['estudiante-carrera'],
    queryFn: getCarrera,
  });
  return { isLoading, isError, data };
};
export default useCarreraEstudiante;
