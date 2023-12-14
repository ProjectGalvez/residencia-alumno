<script setup lang="ts">
import LoaderSpinner from '../../../shared/components/LoaderSpinner.vue';
import { toRef, ref } from 'vue';
import FormArea from './FormArea.vue';
import { Area } from 'src/modules/model/Model';
import documentosApi from 'src/api/documentosApi';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import { ServerValidationError } from 'src/shared/helpers/errorUtils';
import useVerArea from '../composables/useVerArea';

const props = defineProps<{
  area_id: number;
}>();
const area_id = toRef(props, 'area_id');
const modal = ref(false);

const { resource: area, isLoading: isLoadingVer } = useVerArea(
  area_id.value + ''
);

const actualizar = async (area: Area) => {
  try {
    const { data } = await documentosApi.patch<Area>('/areas/' + area.id, area);
    return data;
  } catch (error) {
    throw error;
  }
};
const queryClient = useQueryClient();
const errorServer = ref<ServerValidationError | unknown | null>(null);
const { mutate, isLoading } = useMutation(actualizar, {
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['areas'],
      exact: false,
    });
    modal.value = false;
  },
  onError: (err: AxiosError) => {
    if (err.response) errorServer.value = err.response?.data;
    else errorServer.value = err;
  },
});
</script>

<template>
  <q-btn
    size="sm"
    color="secondary"
    push
    glossy
    icon="edit"
    @click="modal = true"
  />
  <q-dialog v-model="modal">
    <q-card>
      <LoaderSpinner v-if="isLoadingVer" />
      <FormArea
        v-else-if="area"
        :area="area"
        :loading="isLoading"
        :errorServer="errorServer"
        @guardar="mutate"
      />
      <q-card-section>
        <q-btn label="Cancelar" color="negative" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
