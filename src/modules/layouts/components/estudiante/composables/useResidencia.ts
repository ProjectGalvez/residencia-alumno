import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { ResidenciaEstudiante } from 'src/modules/model/Model';

const getResidencia = async (): Promise<ResidenciaEstudiante[]> => {
  const { data } = await documentosApi.get<ResidenciaEstudiante[]>(
    'estudiante-residencia'
  );
  return data;
};

const useResidencia = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['estudiante-residencia'],
    queryFn: getResidencia,
  });
  return { isLoading, error, data };
};
export default useResidencia;
