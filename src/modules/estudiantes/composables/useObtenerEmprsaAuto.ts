import { useQuery } from '@tanstack/vue-query';
import documentosApi from 'src/api/documentosApi';
import { Empresa } from 'src/modules/model/Model';
import { ref, watch } from 'vue';

const getResource = async <Empresa>(nombre: string): Promise<Empresa[]> => {
  const { data } = await documentosApi.get<Empresa[]>('/empresas-select', {
    params: { nombre: nombre },
  });
  return data;
};

const useObtenerEmprsaAuto = (nombre: string) => {
  const resource = ref<Empresa[]>();
  const { data, isLoading, error } = useQuery(['empresas'], () =>
    getResource<Empresa>(nombre)
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
export default useObtenerEmprsaAuto;
