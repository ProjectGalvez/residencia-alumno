import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { VerResidente } from 'src/modules/model/Model';
import { ref, watch } from 'vue';

const getResidente = async (id: string): Promise<VerResidente> => {
  const { data } = await documentosApi.get<VerResidente>(
    '/residentes-ver/' + id
  );
  return data;
};
const useVerResidente = (id: string) => {
  const resource = ref();
  const { isLoading, data } = useQuery({
    queryKey: ['residente', id],
    queryFn: () => getResidente(id),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
  });

  watch(
    data,
    () => {
      if (data.value) {
        resource.value = { ...data.value };
      }
    },
    { immediate: true }
  );
  return { isLoading, residente: resource };
};
export default useVerResidente;
