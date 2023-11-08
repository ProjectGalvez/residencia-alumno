import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Periodo } from 'src/modules/model/Model';
import { ref, watch } from 'vue';

const getResource = async <Periodo>(): Promise<Periodo> => {
  const { data } = await documentosApi.get<Periodo>('/periodo-activo');
  return data;
};

const useVerPeriodo = () => {
  const resource = ref<Periodo>();
  const { data, isLoading, error } = useQuery(
    ['periodo-activo'],
    () => getResource<Periodo>(),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  watch(
    data,
    () => {
      if (data.value) {
        resource.value = { ...data.value };
      }
    },
    { immediate: true }
  );
  return { resource, isLoading, error };
};
export default useVerPeriodo;
