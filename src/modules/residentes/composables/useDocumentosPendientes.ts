import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { DocumentoPendienteRes } from 'src/modules/model/Model';

const getResidente = async (id: string): Promise<DocumentoPendienteRes[]> => {
  const { data } = await documentosApi.get<DocumentoPendienteRes[]>(
    '/residentes-doc-pendientes/' + id
  );
  return data;
};
const useDocumentosPendientes = (id: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ['documentos-pendientes', id],
    queryFn: () => getResidente(id),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
  });
  return { isLoading, data };
};
export default useDocumentosPendientes;
