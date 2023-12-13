<script setup lang="ts">
import { Area } from 'src/modules/model/Model';
import { computed } from 'vue';

interface ComponentProps {
  modelValue: Area;
}
const props = defineProps<ComponentProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', newValue: Area | null): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (newValue: Area | null) => emit('update:modelValue', newValue),
});
</script>
<template>
  <div class="col-xs-12 col-sm-12">
    <q-input
      v-model="model.nombre"
      label-slot
      :rules="[
        (val) => !!val || 'El nombre del área es requerido',
        (value) =>
          (value.length > 3 && value.length < 255) ||
          'Debe tener más de 3 caracteres y menos de 255',
      ]"
    >
      <template v-slot:label>
        Área de la empresa <span class="required-star">*</span>
      </template>
    </q-input>
  </div>
  <div class="col-xs-12 col-sm-6">
    <q-input v-model="model.asesor_externo" label-slot>
      <template v-slot:label> Nombre del asesor externo </template>
    </q-input>
  </div>

  <div class="col-xs-12 col-sm-6">
    <q-input v-model="model.asesor_externo_puesto" label-slot>
      <template v-slot:label> Puesto del asesor externo </template>
    </q-input>
  </div>

  <div class="col-xs-12 col-sm-6">
    <q-input v-model="model.nombre_firmara" label-slot>
      <template v-slot:label> Nombre del que firmará </template>
    </q-input>
  </div>

  <div class="col-xs-12 col-sm-6">
    <q-input v-model="model.nombre_firmara_puesto" label-slot>
      <template v-slot:label> Puesto del que firmará </template>
    </q-input>
  </div>
</template>

<style scoped></style>
