<script setup lang="ts">
import { toRef, computed } from 'vue';

interface Props {
  modelValue: boolean;
  recursoId: string | number | any;
  mensaje?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mensaje: '¿Estas seguro de eliminar este registro?',
  icon: 'delete',
});
const id = toRef(props, 'recursoId');

const emit = defineEmits<{
  (event: 'eliminar', id: string | number | string[]): void;
  (event: 'update:modelValue', newValue: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});

const emitirEliminar = (id: string | number) => {
  emit('eliminar', id);
};
</script>
<template>
  <q-dialog v-model="model">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm">{{ props.mensaje }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          label="Aceptar"
          color="negative"
          v-close-popup
          @click="emitirEliminar(id)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
