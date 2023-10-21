import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
const getNumeroResidentes = async (): Promise<[]> => {
  const { data } = await documentosApi.get('num-residentes');
  return data;
};

const useNumeroResidentes = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['num-residentes'],
    queryFn: getNumeroResidentes,
  });
  return { isLoading, isError, data };
};
export default useNumeroResidentes;
