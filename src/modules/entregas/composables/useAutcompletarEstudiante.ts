import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { AutocompletarEstudiante } from 'src/modules/model/Model';

const getEstudiante = async (
  busqueda: string
): Promise<AutocompletarEstudiante[]> => {
  const { data } = await documentosApi.get<AutocompletarEstudiante[]>(
    `/estudiante-autompletar?busqueda=${busqueda}`
  );
  return data;
};

const useAutcompletarEstudiante = (busqueda: string) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['estudiante-autompletar'],
    queryFn: () => getEstudiante(busqueda),
  });
  return { isLoading, isError, data };
};
export default useAutcompletarEstudiante;
