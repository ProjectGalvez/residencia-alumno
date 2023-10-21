import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { CarreraNumeroResidente } from 'src/modules/model/Model';

const getNumeroResidentes = async (): Promise<CarreraNumeroResidente[]> => {
  const { data } = await documentosApi.get<CarreraNumeroResidente[]>(
    'num-residentes-carrera'
  );
  return data;
};

const useNumeroResidentesCarrera = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['num-residentes-carrera'],
    queryFn: getNumeroResidentes,
  });
  return { isLoading, isError, data };
};
export default useNumeroResidentesCarrera;
